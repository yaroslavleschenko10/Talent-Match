"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  authApi,
  setToken,
  setStoredUser,
  getStoredUser,
  getToken,
  type AuthUser,
  candidatesApi,
  employersApi,
  type ApiCandidate,
  type ApiEmployer,
} from "@/lib/api"

type AuthState = {
  user: AuthUser | null
  token: string | null
  candidateProfile: ApiCandidate | null
  employerProfile: ApiEmployer | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: Record<string, unknown>) => Promise<void>
  logout: () => void
  refreshProfiles: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setTokenState] = useState<string | null>(null)
  const [candidateProfile, setCandidateProfile] = useState<ApiCandidate | null>(null)
  const [employerProfile, setEmployerProfile] = useState<ApiEmployer | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfiles = useCallback(async () => {
    const u = getStoredUser<AuthUser>()
    if (!u) return
    try {
      if (u.role === "candidate") {
        const p = await candidatesApi.me()
        setCandidateProfile(p)
      } else if (u.role === "employer") {
        const p = await employersApi.me()
        setEmployerProfile(p)
      }
    } catch {
      /* profile may not exist yet */
    }
  }, [])

  useEffect(() => {
    const t = getToken()
    const u = getStoredUser<AuthUser>()
    setTokenState(t)
    setUser(u)
    if (t && u) {
      refreshProfiles().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [refreshProfiles])

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    setToken(res.accessToken)
    setStoredUser(res.user)
    setTokenState(res.accessToken)
    setUser(res.user)
    if (res.user.role === "candidate") {
      try {
        setCandidateProfile(await candidatesApi.me())
      } catch {
        setCandidateProfile(null)
      }
    } else if (res.user.role === "employer") {
      try {
        setEmployerProfile(await employersApi.me())
      } catch {
        setEmployerProfile(null)
      }
    }
  }, [])

  const register = useCallback(async (data: Record<string, unknown>) => {
    const res = await authApi.register(data)
    setToken(res.accessToken)
    setStoredUser(res.user)
    setTokenState(res.accessToken)
    setUser(res.user)
    await refreshProfiles()
  }, [refreshProfiles])

  const logout = useCallback(() => {
    setToken(null)
    setStoredUser(null)
    setTokenState(null)
    setUser(null)
    setCandidateProfile(null)
    setEmployerProfile(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      candidateProfile,
      employerProfile,
      loading,
      login,
      register,
      logout,
      refreshProfiles,
    }),
    [user, token, candidateProfile, employerProfile, loading, login, register, logout, refreshProfiles],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
