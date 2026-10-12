const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

type RequestOptions = {
  method?: string
  body?: unknown
  token?: string | null
  params?: Record<string, string | number | undefined>
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("tm_token")
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return
  if (token) localStorage.setItem("tm_token", token)
  else localStorage.removeItem("tm_token")
}

export function getStoredUser<T = { id: string; email: string; role: string }>(): T | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("tm_user")
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setStoredUser(user: unknown | null) {
  if (typeof window === "undefined") return
  if (user) localStorage.setItem("tm_user", JSON.stringify(user))
  else localStorage.removeItem("tm_user")
}

export async function api<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, params } = options

  let url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`
  if (params) {
    const qs = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") qs.set(k, String(v))
    }
    const s = qs.toString()
    if (s) url += `?${s}`
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  const auth = token === undefined ? getToken() : token
  if (auth) headers.Authorization = `Bearer ${auth}`

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let message = res.statusText
    try {
      const data = await res.json()
      message = data.message || data.error || message
      if (Array.isArray(message)) message = message.join(", ")
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ——— Auth ———
export type AuthUser = { id: string; email: string; role: "candidate" | "employer" | "admin" }
export type AuthResponse = { accessToken: string; user: AuthUser }

export const authApi = {
  login: (email: string, password: string) =>
    api<AuthResponse>("/auth/login", { method: "POST", body: { email, password }, token: null }),
  register: (data: Record<string, unknown>) =>
    api<AuthResponse>("/auth/register", { method: "POST", body: data, token: null }),
}

// ——— Candidates ———
export type ApiCandidate = {
  id: string
  userId: string
  firstName: string
  middleName?: string
  lastName: string
  birthDate?: string
  gender?: string
  avatarUrl?: string
  phone?: string
  telegram?: string
  viber?: string
  linkedin?: string
  portfolio?: string
  position: string
  experienceYears: number
  location: string
  relocate: boolean
  salaryExpectation?: string
  employmentTypes: string[]
  workSchedules: string[]
  skills: string[]
  summary?: string
  languages: { language: string; level: string }[]
  cvFileUrl?: string
  available: boolean
  profileVisible: boolean
  showSalary: boolean
  showContacts: boolean
  workHistory?: { id: string; company: string; position: string; period: string; description?: string }[]
  education?: { id: string; institution: string; degree: string; field: string; year: number }[]
  projects?: unknown[]
  user?: { email: string }
}

export const candidatesApi = {
  list: (params?: { position?: string; location?: string; minExperience?: number; skill?: string }) =>
    api<ApiCandidate[]>("/candidates", { params: params as Record<string, string | number | undefined> }),
  one: (id: string) => api<ApiCandidate>(`/candidates/${id}`),
  me: () => api<ApiCandidate>("/candidates/me"),
  updateMe: (data: Partial<ApiCandidate>) =>
    api<ApiCandidate>("/candidates/me", { method: "PATCH", body: data }),
  /** Upload CV file (PDF/DOC/DOCX). Returns public URL path. */
  uploadCv: async (file: File) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
    const token = typeof window !== "undefined" ? localStorage.getItem("tm_token") : null
    const form = new FormData()
    form.append("file", file)
    const res = await fetch(`${base}/candidates/me/cv`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })
    if (!res.ok) {
      let message = res.statusText
      try {
        const data = await res.json()
        message = data.message || message
        if (Array.isArray(message)) message = message.join(", ")
      } catch {
        /* ignore */
      }
      throw new ApiError(res.status, message)
    }
    return res.json() as Promise<{
      cvFileUrl: string
      url: string
      filename: string
      size: number
    }>
  },
}

/** Full public URL for uploaded files */
export function fileUrl(path?: string | null): string | undefined {
  if (!path) return undefined
  if (path.startsWith("http")) return path
  const base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api").replace(/\/api$/, "")
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

// ——— Employers ———
export type ApiEmployer = {
  id: string
  userId: string
  companyName: string
  industry?: string
  size?: string
  location?: string
  website?: string
  logoUrl?: string
  description?: string
  contactPerson: string
  phone?: string
}

export const employersApi = {
  me: () => api<ApiEmployer>("/employers/me"),
  one: (id: string) => api<ApiEmployer>(`/employers/${id}`),
  updateMe: (data: Partial<ApiEmployer>) =>
    api<ApiEmployer>("/employers/me", { method: "PATCH", body: data }),
}

// ——— Vacancies ———
export type ApiVacancy = {
  id: string
  employerId: string
  title: string
  department?: string
  description: string
  requirements: { id: string; name: string; required: boolean; weight: number }[]
  skills: string[]
  experienceMin: number
  experienceMax: number
  salaryMin?: number
  salaryMax?: number
  employmentType: string
  workSchedule: string
  location: string
  isRemote: boolean
  status: "active" | "paused" | "closed"
  candidates?: ApiVacancyCandidate[]
  createdAt: string
  updatedAt: string
}

export type ApiVacancyCandidate = {
  id: string
  vacancyId: string
  candidateId: string
  candidate?: ApiCandidate
  status: string
  matchScore: number
  rejectionReason?: string
  notes?: string
  appliedAt: string
}

export const vacanciesApi = {
  list: (employerId: string) => api<ApiVacancy[]>("/vacancies", { params: { employerId } }),
  one: (id: string) => api<ApiVacancy>(`/vacancies/${id}`),
  create: (data: Partial<ApiVacancy> & { employerId: string }) =>
    api<ApiVacancy>("/vacancies", { method: "POST", body: data }),
  update: (id: string, data: Partial<ApiVacancy>) =>
    api<ApiVacancy>(`/vacancies/${id}`, { method: "PATCH", body: data }),
  setStatus: (id: string, status: string) =>
    api<ApiVacancy>(`/vacancies/${id}/status`, { method: "PATCH", body: { status } }),
}

// ——— Pipeline ———
export type ApiPipelineStage = {
  id: string
  employerId: string
  name: string
  order: number
  color: string
}

export type ApiPipelineCandidate = {
  id: string
  candidateId: string
  candidate?: ApiCandidate
  stageId: string
  employerId: string
  notes?: string
  addedAt: string
  updatedAt: string
}

export const pipelineApi = {
  stages: (employerId: string) =>
    api<ApiPipelineStage[]>("/pipeline/stages", { params: { employerId } }),
  candidates: (employerId: string) =>
    api<ApiPipelineCandidate[]>("/pipeline/candidates", { params: { employerId } }),
  add: (data: { employerId: string; candidateId: string; stageId: string; notes?: string }) =>
    api<ApiPipelineCandidate>("/pipeline/candidates", { method: "POST", body: data }),
  move: (id: string, stageId: string) =>
    api<ApiPipelineCandidate>(`/pipeline/candidates/${id}/stage`, {
      method: "PATCH",
      body: { stageId },
    }),
}

// ——— Chats ———
export type ApiChat = {
  id: string
  employerId: string
  candidateId: string
  candidate?: ApiCandidate
  employer?: ApiEmployer
  vacancyId?: string
  vacancyTitle?: string
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export type ApiChatMessage = {
  id: string
  chatId: string
  senderId: string
  senderType: "employer" | "candidate"
  content: string
  read: boolean
  createdAt: string
}

export const chatsApi = {
  list: (params: { employerId?: string; candidateId?: string }) =>
    api<ApiChat[]>("/chats", { params }),
  messages: (chatId: string) => api<ApiChatMessage[]>(`/chats/${chatId}/messages`),
  send: (chatId: string, data: { senderId: string; senderType: string; content: string }) =>
    api<ApiChatMessage>(`/chats/${chatId}/messages`, { method: "POST", body: data }),
}

// ——— Interviews ———
export type ApiInterview = {
  id: string
  vacancyId?: string
  candidateId: string
  candidate?: ApiCandidate
  employerId: string
  title: string
  type: string
  date: string
  startTime: string
  endTime: string
  meetingLink?: string
  meetingType: string
  location?: string
  notes?: string
  status: string
  participants: string[]
}

export const interviewsApi = {
  list: (params: { employerId?: string; candidateId?: string }) =>
    api<ApiInterview[]>("/interviews", { params }),
  create: (data: Partial<ApiInterview>) =>
    api<ApiInterview>("/interviews", { method: "POST", body: data }),
  update: (id: string, data: Partial<ApiInterview>) =>
    api<ApiInterview>(`/interviews/${id}`, { method: "PATCH", body: data }),
}

// ——— Requests / applications / blacklist / saved ———
export const requestsApi = {
  list: (candidateId: string) =>
    api<unknown[]>("/requests", { params: { candidateId } }),
  create: (data: Record<string, unknown>) =>
    api("/requests", { method: "POST", body: data }),
  setStatus: (id: string, status: string) =>
    api(`/requests/${id}/status`, { method: "PATCH", body: { status } }),
}

export const applicationsApi = {
  list: (candidateId: string) =>
    api<unknown[]>("/applications", { params: { candidateId } }),
}

export const blacklistApi = {
  list: (candidateId: string) =>
    api<unknown[]>("/blacklist", { params: { candidateId } }),
  add: (data: Record<string, unknown>) =>
    api("/blacklist", { method: "POST", body: data }),
  remove: (id: string) => api(`/blacklist/${id}`, { method: "DELETE" }),
}

export const savedJobsApi = {
  list: (candidateId: string) =>
    api<unknown[]>("/saved-jobs", { params: { candidateId } }),
  save: (data: Record<string, unknown>) =>
    api("/saved-jobs", { method: "POST", body: data }),
  remove: (id: string) => api(`/saved-jobs/${id}`, { method: "DELETE" }),
}

/** Map API candidate → frontend Candidate shape used by existing UI */
export function mapCandidate(c: ApiCandidate) {
  return {
    id: c.id,
    name: [c.firstName, c.lastName].filter(Boolean).join(" "),
    middleName: c.middleName,
    birthDate: c.birthDate || "",
    gender: (c.gender as "male" | "female" | "other") || "other",
    avatar: c.avatarUrl || "/placeholder-user.jpg",
    email: c.user?.email || "",
    phone: c.phone || "",
    telegram: c.telegram,
    viber: c.viber,
    linkedin: c.linkedin,
    portfolio: c.portfolio,
    position: c.position,
    experience: c.experienceYears,
    location: c.location,
    relocate: c.relocate,
    salary: c.salaryExpectation || "",
    employmentType: (c.employmentTypes || []) as (
      | "full-time"
      | "part-time"
      | "contract"
      | "freelance"
      | "internship"
    )[],
    workSchedule: (c.workSchedules || []) as ("office" | "remote" | "hybrid")[],
    skills: c.skills || [],
    summary: c.summary || "",
    education: (c.education || []).map((e) => ({
      institution: e.institution,
      degree: e.degree,
      field: e.field,
      year: e.year,
    })),
    languages: c.languages || [],
    workHistory: (c.workHistory || []).map((w) => ({
      company: w.company,
      position: w.position,
      period: w.period,
      description: w.description || "",
    })),
    cvFile: c.cvFileUrl,
    available: c.available,
    profileVisible: c.profileVisible,
    showSalary: c.showSalary,
    showContacts: c.showContacts,
  }
}
