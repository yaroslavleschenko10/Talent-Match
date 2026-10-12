// Типи зайнятості
export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship"
export type WorkSchedule = "office" | "remote" | "hybrid"
export type Gender = "male" | "female" | "other"

export interface Candidate {
  id: string
  // Особиста інформація
  name: string
  middleName?: string
  birthDate: string
  gender: Gender
  avatar: string
  
  // Контактні дані
  email: string
  phone: string
  telegram?: string
  viber?: string
  linkedin?: string
  portfolio?: string
  
  // Професійна інформація
  position: string
  experience: number
  location: string
  relocate: boolean
  salary: string
  employmentType: EmploymentType[]
  workSchedule: WorkSchedule[]
  skills: string[]
  summary: string
  
  // Освіта та досвід
  education: {
    institution: string
    degree: string
    field: string
    year: number
  }[]
  languages: { language: string; level: string }[]
  workHistory: {
    company: string
    position: string
    period: string
    description: string
  }[]
  
  // CV файл
  cvFile?: string
  
  // Статус та налаштування
  available: boolean
  profileVisible: boolean
  showSalary: boolean
  showContacts: boolean
}

// Запити від роботодавців
export interface EmployerRequest {
  id: string
  candidateId: string
  employerId: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  position: string
  salaryRange: string
  employmentType: EmploymentType
  workSchedule: WorkSchedule
  message: string
  status: "pending" | "accepted" | "rejected" | "interview"
  createdAt: string
  updatedAt: string
}

// Збережені вакансії
export interface SavedJob {
  id: string
  candidateId: string
  companyName: string
  position: string
  salary: string
  location: string
  savedAt: string
}

// Роботодавець
export interface Employer {
  id: string
  companyName: string
  industry: string
  size: string
  location: string
  website?: string
  logo?: string
  description: string
  contactPerson: string
  email: string
  phone: string
}

// Воронка найму
export interface PipelineStage {
  id: string
  name: string
  order: number
  color: string
}

export interface PipelineCandidate {
  id: string
  candidateId: string
  candidate: Candidate
  stageId: string
  employerId: string
  notes: string
  addedAt: string
  updatedAt: string
}

// Аналітика
export interface HiringAnalytics {
  totalRequests: number
  accepted: number
  rejected: number
  pending: number
  averageResponseTime: number
  topRejectionReasons: { reason: string; count: number }[]
}

// Вакансії роботодавця
export type CandidateStatus = "recommended" | "potential" | "rejected" | "new"

export interface VacancyRequirement {
  id: string
  name: string
  required: boolean
  weight: number // 1-10
}

export interface VacancyCandidate {
  id: string
  candidateId: string
  candidate: Candidate
  status: CandidateStatus
  matchScore: number // 0-100
  rejectionReason?: string
  notes: string
  testResult?: {
    testId: string
    score: number
    completedAt: string
  }
  appliedAt: string
}

export interface Vacancy {
  id: string
  employerId: string
  title: string
  department: string
  description: string
  requirements: VacancyRequirement[]
  skills: string[]
  experienceMin: number
  experienceMax: number
  salaryMin: number
  salaryMax: number
  employmentType: EmploymentType
  workSchedule: WorkSchedule
  location: string
  isRemote: boolean
  status: "active" | "paused" | "closed"
  candidates: VacancyCandidate[]
  createdAt: string
  updatedAt: string
}

// Календар та співбесіди
export interface Interview {
  id: string
  vacancyId: string
  candidateId: string
  candidate: Candidate
  title: string
  type: "screening" | "technical" | "hr" | "final"
  date: string
  startTime: string
  endTime: string
  meetingLink?: string
  meetingType: "google_meet" | "zoom" | "teams" | "offline"
  location?: string
  notes?: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  participants: string[]
}

// Чати
export interface ChatMessage {
  id: string
  chatId: string
  senderId: string
  senderType: "employer" | "candidate"
  content: string
  attachments?: { name: string; url: string; type: string }[]
  createdAt: string
  read: boolean
}

export interface Chat {
  id: string
  employerId: string
  candidateId: string
  candidate: Candidate
  vacancyId?: string
  vacancyTitle?: string
  lastMessage?: ChatMessage
  unreadCount: number
  createdAt: string
  updatedAt: string
}

// Сховище матеріалів
export interface StorageMaterial {
  id: string
  employerId: string
  title: string
  description: string
  type: "document" | "image" | "video" | "link" | "test"
  category: "job_description" | "company_info" | "test_task" | "presentation" | "other"
  url: string
  fileSize?: number
  createdAt: string
}

// Тести
export interface Test {
  id: string
  employerId: string
  title: string
  description: string
  type: "technical" | "soft_skills" | "language" | "logic"
  duration: number // хвилини
  questionsCount: number
  passingScore: number
  link: string
  createdAt: string
}

export interface CandidateTest {
  id: string
  testId: string
  test: Test
  candidateId: string
  vacancyId?: string
  status: "not_started" | "in_progress" | "completed"
  score?: number
  startedAt?: string
  completedAt?: string
  deadline: string
}

// Для кандидата: список компаній
export interface CompanyApplication {
  id: string
  candidateId: string
  companyName: string
  companyLogo?: string
  vacancyTitle: string
  status: "sent" | "viewed" | "interview" | "offer" | "rejected" | "accepted"
  appliedAt: string
  updatedAt: string
  notes?: string
}

// Чорний список
export interface BlacklistedCompany {
  id: string
  candidateId: string
  companyName: string
  reason: string
  addedAt: string
}

// Збережені матеріали кандидата
export interface SavedMaterial {
  id: string
  candidateId: string
  title: string
  url: string
  category: string
  notes?: string
  savedAt: string
}

// Проєкти кандидата
export interface CandidateProject {
  id: string
  candidateId: string
  title: string
  description: string
  role: string
  technologies: string[]
  link?: string
  imageUrl?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Олена",
    middleName: "Коваленко",
    birthDate: "1995-03-15",
    gender: "female",
    avatar: "/professional-woman-developer.png",
    email: "olena.kovalenko@email.com",
    phone: "+380 67 123 4567",
    telegram: "@olena_kovalenko",
    viber: "+380 67 123 4567",
    linkedin: "linkedin.com/in/olena-kovalenko",
    position: "Frontend Developer",
    experience: 4,
    location: "Київ",
    relocate: true,
    salary: "80 000 - 100 000 грн",
    employmentType: ["full-time", "contract"],
    workSchedule: ["remote", "hybrid"],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
    summary: "Досвідчений Frontend розробник з 4+ роками досвіду створення сучасних веб-додатків. Спеціалізуюсь на React екосистемі та створенні інтуїтивних користувацьких інтерфейсів.",
    education: [
      { institution: "КПІ ім. Ігоря Сікорського", degree: "Магістр", field: "Комп'ютерні науки", year: 2018 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Upper-Intermediate" },
      { language: "Польська", level: "Базова" }
    ],
    workHistory: [
      { company: "TechStart Ukraine", position: "Senior Frontend Developer", period: "2022 - теперішній час", description: "Розробка корпоративних веб-додатків з використанням React та Next.js. Участь у архітектурних рішеннях та менторство молодших розробників." },
      { company: "WebSolutions", position: "Frontend Developer", period: "2020 - 2022", description: "Створення адаптивних веб-сайтів та SPA додатків. Оптимізація продуктивності та покращення UX." }
    ],
    cvFile: "/cv/olena-kovalenko-cv.pdf",
    available: true,
    profileVisible: true,
    showSalary: true,
    showContacts: true,
  },
  {
    id: "2",
    name: "Андрій",
    middleName: "Шевченко",
    birthDate: "1992-08-22",
    gender: "male",
    avatar: "/professional-man-developer.png",
    email: "andriy.shevchenko@email.com",
    phone: "+380 50 987 6543",
    telegram: "@andriy_dev",
    linkedin: "linkedin.com/in/andriy-shevchenko",
    portfolio: "andriy-dev.com",
    position: "Full Stack Developer",
    experience: 6,
    location: "Львів",
    relocate: false,
    salary: "100 000 - 120 000 грн",
    employmentType: ["full-time"],
    workSchedule: ["remote"],
    skills: ["Node.js", "React", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    summary: "Full Stack розробник з 6 роками досвіду. Експерт у створенні масштабованих веб-додатків. Маю досвід роботи з мікросервісною архітектурою та хмарними технологіями.",
    education: [
      { institution: "Львівська Політехніка", degree: "Бакалавр", field: "Програмна інженерія", year: 2015 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Advanced" },
      { language: "Німецька", level: "Intermediate" }
    ],
    workHistory: [
      { company: "GlobalTech", position: "Lead Full Stack Developer", period: "2021 - теперішній час", description: "Керівництво командою з 5 розробників. Проектування та реалізація мікросервісної архітектури для e-commerce платформи." },
      { company: "StartupHub", position: "Full Stack Developer", period: "2018 - 2021", description: "Розробка MVP для стартапів. Повний цикл розробки від концепції до деплою." }
    ],
    available: true,
    profileVisible: true,
    showSalary: true,
    showContacts: true,
  },
  {
    id: "3",
    name: "Марія",
    middleName: "Петренко",
    birthDate: "1997-11-08",
    gender: "female",
    avatar: "/professional-woman-designer.png",
    email: "maria.petrenko@email.com",
    phone: "+380 63 456 7890",
    telegram: "@maria_design",
    viber: "+380 63 456 7890",
    linkedin: "linkedin.com/in/maria-petrenko",
    portfolio: "mariadesign.com",
    position: "UI/UX Designer",
    experience: 3,
    location: "Київ",
    relocate: true,
    salary: "60 000 - 80 000 грн",
    employmentType: ["full-time", "freelance"],
    workSchedule: ["remote", "hybrid", "office"],
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    summary: "Креативний UI/UX дизайнер з фокусом на user-centered design. Створюю інтуїтивні та естетичні інтерфейси, що підвищують конверсію та задоволеність користувачів.",
    education: [
      { institution: "НАУ", degree: "Бакалавр", field: "Дизайн", year: 2019 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Upper-Intermediate" }
    ],
    workHistory: [
      { company: "DesignLab", position: "UI/UX Designer", period: "2021 - теперішній час", description: "Проектування інтерфейсів для мобільних та веб додатків. Проведення користувацьких досліджень та A/B тестування." },
      { company: "Creative Agency", position: "Junior Designer", period: "2020 - 2021", description: "Створення дизайн-систем та прототипів. Робота з брендингом та візуальною ідентичністю." }
    ],
    available: true,
    profileVisible: true,
    showSalary: true,
    showContacts: false,
  },
  {
    id: "4",
    name: "Дмитро",
    middleName: "Бондаренко",
    birthDate: "1993-05-20",
    gender: "male",
    avatar: "/professional-man-backend.jpg",
    email: "dmytro.bondarenko@email.com",
    phone: "+380 95 234 5678",
    telegram: "@dmytro_backend",
    linkedin: "linkedin.com/in/dmytro-bondarenko",
    position: "Backend Developer",
    experience: 5,
    location: "Харків",
    relocate: false,
    salary: "90 000 - 110 000 грн",
    employmentType: ["full-time"],
    workSchedule: ["remote"],
    skills: ["Python", "Django", "FastAPI", "Redis", "MongoDB", "Kubernetes"],
    summary: "Backend розробник з сильними навичками у Python та проектуванні API. Спеціалізуюсь на високонавантажених системах та оптимізації продуктивності.",
    education: [
      { institution: "ХНУ ім. Каразіна", degree: "Магістр", field: "Прикладна математика", year: 2016 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Advanced" }
    ],
    workHistory: [
      { company: "FinTech Solutions", position: "Senior Backend Developer", period: "2020 - теперішній час", description: "Розробка API для фінансових сервісів. Оптимізація баз даних та впровадження кешування." },
      { company: "DataSystems", position: "Backend Developer", period: "2018 - 2020", description: "Створення RESTful API та інтеграція з зовнішніми сервісами." }
    ],
    available: false,
    profileVisible: true,
    showSalary: true,
    showContacts: true,
  },
  {
    id: "5",
    name: "Юлія",
    middleName: "Мельник",
    birthDate: "1989-12-03",
    gender: "female",
    avatar: "/professional-woman-manager.png",
    email: "yulia.melnyk@email.com",
    phone: "+380 67 890 1234",
    telegram: "@yulia_pm",
    linkedin: "linkedin.com/in/yulia-melnyk",
    position: "Product Manager",
    experience: 7,
    location: "Дніпро",
    relocate: true,
    salary: "120 000 - 150 000 грн",
    employmentType: ["full-time"],
    workSchedule: ["hybrid", "office"],
    skills: ["Product Strategy", "Agile", "Jira", "Analytics", "Roadmapping", "Stakeholder Management"],
    summary: "Досвідчений Product Manager з успішним досвідом запуску та масштабування цифрових продуктів. Поєднання технічного розуміння з бізнес-стратегією.",
    education: [
      { institution: "ДНУ", degree: "Магістр", field: "Економіка та підприємництво", year: 2012 },
      { institution: "Product School", degree: "Certificate", field: "Product Management", year: 2018 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Fluent" },
      { language: "Французька", level: "Базова" }
    ],
    workHistory: [
      { company: "Tech Innovations", position: "Senior Product Manager", period: "2019 - теперішній час", description: "Керівництво продуктовим портфелем. Запуск нових фіч, що збільшили revenue на 40%." },
      { company: "StartupVenture", position: "Product Manager", period: "2016 - 2019", description: "Побудова продукту з нуля. Робота з кросфункціональними командами." }
    ],
    available: true,
    profileVisible: true,
    showSalary: false,
    showContacts: true,
  },
  {
    id: "6",
    name: "Ігор",
    middleName: "Кравченко",
    birthDate: "1994-07-18",
    gender: "male",
    avatar: "/professional-engineer.png",
    email: "igor.kravchenko@email.com",
    phone: "+380 93 567 8901",
    telegram: "@igor_devops",
    linkedin: "linkedin.com/in/igor-kravchenko",
    position: "DevOps Engineer",
    experience: 4,
    location: "Одеса",
    relocate: true,
    salary: "85 000 - 105 000 грн",
    employmentType: ["full-time", "contract"],
    workSchedule: ["remote"],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"],
    summary: "DevOps інженер з досвідом автоматизації та оптимізації процесів розробки. Експертиза у хмарних технологіях та containerization.",
    education: [
      { institution: "ОНУ", degree: "Бакалавр", field: "Інформаційні технології", year: 2017 }
    ],
    languages: [
      { language: "Українська", level: "Рідна" },
      { language: "Англійська", level: "Upper-Intermediate" }
    ],
    workHistory: [
      { company: "CloudServices", position: "DevOps Engineer", period: "2020 - теперішній час", description: "Побудова CI/CD pipeline. Міграція на Kubernetes та оптимізація витрат на AWS." },
      { company: "TechSolutions", position: "Junior DevOps", period: "2019 - 2020", description: "Підтримка інфраструктури та автоматизація deployment процесів." }
    ],
    available: true,
    profileVisible: true,
    showSalary: true,
    showContacts: true,
  },
]

export function getCandidateById(id: string): Candidate | undefined {
  return mockCandidates.find((c) => c.id === id)
}

export function filterCandidates(filters: {
  position?: string
  location?: string
  minExperience?: number
  skills?: string[]
}): Candidate[] {
  return mockCandidates.filter((candidate) => {
    if (filters.position && !candidate.position.toLowerCase().includes(filters.position.toLowerCase())) {
      return false
    }
    if (filters.location && filters.location !== "all" && candidate.location !== filters.location) {
      return false
    }
    if (filters.minExperience && candidate.experience < filters.minExperience) {
      return false
    }
    if (filters.skills && filters.skills.length > 0) {
      const hasSkill = filters.skills.some((skill) =>
        candidate.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasSkill) return false
    }
    return true
  })
}

export const allSkills = Array.from(new Set(mockCandidates.flatMap((c) => c.skills))).sort()

export const allLocations = Array.from(new Set(mockCandidates.map((c) => c.location))).sort()

// Мокові роботодавці
export const mockEmployers: Employer[] = [
  {
    id: "emp1",
    companyName: "TechCorp Ukraine",
    industry: "IT",
    size: "100-500",
    location: "Київ",
    website: "techcorp.ua",
    logo: "/logos/techcorp.png",
    description: "Провідна IT-компанія з розробки корпоративного програмного забезпечення",
    contactPerson: "Олександр Іваненко",
    email: "hr@techcorp.ua",
    phone: "+380 44 123 4567",
  },
  {
    id: "emp2",
    companyName: "StartupHub",
    industry: "IT / Стартапи",
    size: "10-50",
    location: "Львів",
    website: "startuphub.io",
    description: "Інкубатор для інноваційних проектів та стартапів",
    contactPerson: "Марина Сидоренко",
    email: "team@startuphub.io",
    phone: "+380 32 987 6543",
  },
]

// Мокові запити від роботодавців
export const mockEmployerRequests: EmployerRequest[] = [
  {
    id: "req1",
    candidateId: "1",
    employerId: "emp1",
    companyName: "TechCorp Ukraine",
    contactPerson: "Олександр Іваненко",
    email: "hr@techcorp.ua",
    phone: "+380 44 123 4567",
    position: "Senior Frontend Developer",
    salaryRange: "90 000 - 120 000 грн",
    employmentType: "full-time",
    workSchedule: "hybrid",
    message: "Вітаємо! Ми шукаємо досвідченого Frontend розробника для нашої команди. Ваш профіль ідеально підходить для нашого проекту з розробки SaaS платформи. Пропонуємо конкурентну зарплату, гнучкий графік та можливості для професійного росту.",
    status: "pending",
    createdAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-01-28T10:00:00Z",
  },
  {
    id: "req2",
    candidateId: "1",
    employerId: "emp2",
    companyName: "StartupHub",
    contactPerson: "Марина Сидоренко",
    email: "team@startuphub.io",
    phone: "+380 32 987 6543",
    position: "Lead Frontend Developer",
    salaryRange: "100 000 - 130 000 грн",
    employmentType: "full-time",
    workSchedule: "remote",
    message: "Привіт! Ми стартап, що швидко зростає, і шукаємо лідера для фронтенд команди. Якщо тебе цікавить робота в динамічному середовищі з можливістю впливати на продукт - давай поспілкуємось!",
    status: "interview",
    createdAt: "2026-01-25T14:30:00Z",
    updatedAt: "2026-01-27T09:15:00Z",
  },
  {
    id: "req3",
    candidateId: "1",
    employerId: "emp1",
    companyName: "FinanceApp",
    contactPerson: "Ігор Павленко",
    email: "hr@financeapp.ua",
    phone: "+380 44 555 1234",
    position: "Frontend Developer",
    salaryRange: "70 000 - 85 000 грн",
    employmentType: "contract",
    workSchedule: "remote",
    message: "Запрошуємо на проект з розробки фінансового додатку. Термін - 6 місяців з можливістю продовження.",
    status: "rejected",
    createdAt: "2026-01-20T11:00:00Z",
    updatedAt: "2026-01-22T16:45:00Z",
  },
]

// Мокові збережені вакансії
export const mockSavedJobs: SavedJob[] = [
  {
    id: "saved1",
    candidateId: "1",
    companyName: "Google Ukraine",
    position: "Frontend Engineer",
    salary: "150 000 - 200 000 грн",
    location: "Київ (Remote)",
    savedAt: "2026-01-26T08:00:00Z",
  },
  {
    id: "saved2",
    candidateId: "1",
    companyName: "EPAM Systems",
    position: "Senior React Developer",
    salary: "100 000 - 140 000 грн",
    location: "Львів",
    savedAt: "2026-01-24T15:30:00Z",
  },
  {
    id: "saved3",
    candidateId: "1",
    companyName: "Grammarly",
    position: "Staff Frontend Engineer",
    salary: "180 000 - 250 000 грн",
    location: "Remote",
    savedAt: "2026-01-22T12:00:00Z",
  },
]

// Pipeline стадії для роботодавця
export const mockPipelineStages: PipelineStage[] = [
  { id: "stage1", name: "Нові", order: 1, color: "#8B5CF6" },
  { id: "stage2", name: "Скринінг", order: 2, color: "#F59E0B" },
  { id: "stage3", name: "Співбесіда", order: 3, color: "#3B82F6" },
  { id: "stage4", name: "Тестове", order: 4, color: "#EC4899" },
  { id: "stage5", name: "Оффер", order: 5, color: "#10B981" },
  { id: "stage6", name: "Найнято", order: 6, color: "#22C55E" },
]

// Мокові кандидати в pipeline
export const mockPipelineCandidates: PipelineCandidate[] = [
  {
    id: "pc1",
    candidateId: "1",
    candidate: mockCandidates[0],
    stageId: "stage3",
    employerId: "emp1",
    notes: "Дуже сильний кандидат, чудово пройшла технічний скринінг",
    addedAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-28T14:00:00Z",
  },
  {
    id: "pc2",
    candidateId: "2",
    candidate: mockCandidates[1],
    stageId: "stage4",
    employerId: "emp1",
    notes: "Надіслано тестове завдання, очікуємо результати",
    addedAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-01-27T11:00:00Z",
  },
  {
    id: "pc3",
    candidateId: "3",
    candidate: mockCandidates[2],
    stageId: "stage1",
    employerId: "emp1",
    notes: "Новий кандидат, потрібно переглянути портфоліо",
    addedAt: "2026-01-28T08:00:00Z",
    updatedAt: "2026-01-28T08:00:00Z",
  },
  {
    id: "pc4",
    candidateId: "5",
    candidate: mockCandidates[4],
    stageId: "stage5",
    employerId: "emp1",
    notes: "Готуємо оффер, узгоджуємо умови",
    addedAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-01-28T16:00:00Z",
  },
  {
    id: "pc5",
    candidateId: "6",
    candidate: mockCandidates[5],
    stageId: "stage2",
    employerId: "emp1",
    notes: "Призначено скринінг на наступний тиждень",
    addedAt: "2026-01-20T14:00:00Z",
    updatedAt: "2026-01-26T10:00:00Z",
  },
]

// Мокова аналітика
export const mockAnalytics: HiringAnalytics = {
  totalRequests: 45,
  accepted: 12,
  rejected: 18,
  pending: 15,
  averageResponseTime: 2.5,
  topRejectionReasons: [
    { reason: "Невідповідна зарплата", count: 8 },
    { reason: "Не влаштовує графік", count: 5 },
    { reason: "Інша пропозиція", count: 3 },
    { reason: "Не цікавий проект", count: 2 },
  ],
}

// Хелпери
export function getRequestsByCandidateId(candidateId: string): EmployerRequest[] {
  return mockEmployerRequests.filter((r) => r.candidateId === candidateId)
}

export function getSavedJobsByCandidateId(candidateId: string): SavedJob[] {
  return mockSavedJobs.filter((j) => j.candidateId === candidateId)
}

export function getPipelineCandidatesByEmployerId(employerId: string): PipelineCandidate[] {
  return mockPipelineCandidates.filter((pc) => pc.employerId === employerId)
}

export function getPipelineCandidatesByStage(employerId: string, stageId: string): PipelineCandidate[] {
  return mockPipelineCandidates.filter((pc) => pc.employerId === employerId && pc.stageId === stageId)
}

export const employmentTypeLabels: Record<EmploymentType, string> = {
  "full-time": "Повна зайнятість",
  "part-time": "Часткова зайнятість",
  "contract": "Контракт",
  "freelance": "Фріланс",
  "internship": "Стажування",
}

export const workScheduleLabels: Record<WorkSchedule, string> = {
  "office": "Офіс",
  "remote": "Віддалено",
  "hybrid": "Гібрид",
}

// Мокові вакансії
export const mockVacancies: Vacancy[] = [
  {
    id: "vac1",
    employerId: "emp1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    description: "Шукаємо досвідченого Frontend розробника для роботи над нашою SaaS платформою. Ви будете частиною команди з 8 інженерів.",
    requirements: [
      { id: "req1", name: "Досвід з React 3+ років", required: true, weight: 10 },
      { id: "req2", name: "TypeScript", required: true, weight: 9 },
      { id: "req3", name: "Next.js", required: false, weight: 7 },
      { id: "req4", name: "Досвід з unit тестами", required: true, weight: 8 },
      { id: "req5", name: "Англійська B2+", required: true, weight: 8 },
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Jest"],
    experienceMin: 3,
    experienceMax: 7,
    salaryMin: 80000,
    salaryMax: 120000,
    employmentType: "full-time",
    workSchedule: "hybrid",
    location: "Київ",
    isRemote: true,
    status: "active",
    candidates: [
      {
        id: "vc1",
        candidateId: "1",
        candidate: mockCandidates[0],
        status: "recommended",
        matchScore: 92,
        notes: "Ідеальний кандидат, всі вимоги виконані",
        appliedAt: "2026-01-25T10:00:00Z",
      },
      {
        id: "vc2",
        candidateId: "2",
        candidate: mockCandidates[1],
        status: "potential",
        matchScore: 78,
        notes: "Сильний кандидат, але більше Full Stack",
        appliedAt: "2026-01-26T14:00:00Z",
      },
      {
        id: "vc3",
        candidateId: "4",
        candidate: mockCandidates[3],
        status: "rejected",
        matchScore: 35,
        rejectionReason: "Спеціалізація на Backend, не підходить для Frontend позиції",
        notes: "",
        appliedAt: "2026-01-24T09:00:00Z",
      },
    ],
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-28T14:00:00Z",
  },
  {
    id: "vac2",
    employerId: "emp1",
    title: "UI/UX Designer",
    department: "Design",
    description: "Шукаємо креативного UI/UX дизайнера для створення інтуїтивних інтерфейсів наших продуктів.",
    requirements: [
      { id: "req1", name: "Figma на професійному рівні", required: true, weight: 10 },
      { id: "req2", name: "Досвід 2+ років", required: true, weight: 8 },
      { id: "req3", name: "Портфоліо з мобільними додатками", required: false, weight: 6 },
      { id: "req4", name: "User Research", required: true, weight: 7 },
    ],
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 50000,
    salaryMax: 80000,
    employmentType: "full-time",
    workSchedule: "remote",
    location: "Київ",
    isRemote: true,
    status: "active",
    candidates: [
      {
        id: "vc4",
        candidateId: "3",
        candidate: mockCandidates[2],
        status: "recommended",
        matchScore: 88,
        notes: "Чудове портфоліо, досвід з user research",
        appliedAt: "2026-01-27T11:00:00Z",
      },
    ],
    createdAt: "2026-01-22T10:00:00Z",
    updatedAt: "2026-01-28T09:00:00Z",
  },
  {
    id: "vac3",
    employerId: "emp1",
    title: "DevOps Engineer",
    department: "Infrastructure",
    description: "Потрібен DevOps інженер для побудови та підтримки CI/CD інфраструктури.",
    requirements: [
      { id: "req1", name: "Kubernetes", required: true, weight: 10 },
      { id: "req2", name: "AWS або GCP", required: true, weight: 9 },
      { id: "req3", name: "Terraform", required: true, weight: 8 },
      { id: "req4", name: "Docker", required: true, weight: 9 },
    ],
    skills: ["Kubernetes", "AWS", "Terraform", "Docker", "CI/CD", "Linux"],
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 70000,
    salaryMax: 110000,
    employmentType: "full-time",
    workSchedule: "remote",
    location: "Одеса",
    isRemote: true,
    status: "active",
    candidates: [
      {
        id: "vc5",
        candidateId: "6",
        candidate: mockCandidates[5],
        status: "potential",
        matchScore: 85,
        notes: "Гарний досвід, призначити технічну співбесіду",
        appliedAt: "2026-01-26T16:00:00Z",
      },
    ],
    createdAt: "2026-01-23T10:00:00Z",
    updatedAt: "2026-01-27T14:00:00Z",
  },
]

// Мокові співбесіди
export const mockInterviews: Interview[] = [
  {
    id: "int1",
    vacancyId: "vac1",
    candidateId: "1",
    candidate: mockCandidates[0],
    title: "Технічна співбесіда - Frontend",
    type: "technical",
    date: "2026-02-03",
    startTime: "14:00",
    endTime: "15:30",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    meetingType: "google_meet",
    notes: "Підготувати питання по React та TypeScript",
    status: "scheduled",
    participants: ["Олександр Іваненко", "Максим Козлов"],
  },
  {
    id: "int2",
    vacancyId: "vac2",
    candidateId: "3",
    candidate: mockCandidates[2],
    title: "HR співбесіда - UI/UX Designer",
    type: "hr",
    date: "2026-02-02",
    startTime: "11:00",
    endTime: "12:00",
    meetingLink: "https://zoom.us/j/123456789",
    meetingType: "zoom",
    status: "scheduled",
    participants: ["Марина Сидоренко"],
  },
  {
    id: "int3",
    vacancyId: "vac1",
    candidateId: "2",
    candidate: mockCandidates[1],
    title: "Фінальна співбесіда з CTO",
    type: "final",
    date: "2026-02-05",
    startTime: "16:00",
    endTime: "17:00",
    meetingLink: "https://meet.google.com/xyz-uvwx-rst",
    meetingType: "google_meet",
    status: "scheduled",
    participants: ["Іван Петренко (CTO)", "Олександр Іваненко"],
  },
  {
    id: "int4",
    vacancyId: "vac3",
    candidateId: "6",
    candidate: mockCandidates[5],
    title: "Скринінг DevOps",
    type: "screening",
    date: "2026-01-30",
    startTime: "10:00",
    endTime: "10:45",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xxx",
    meetingType: "teams",
    status: "completed",
    participants: ["Дмитро Ковальчук"],
  },
]

// Мокові чати
export const mockChats: Chat[] = [
  {
    id: "chat1",
    employerId: "emp1",
    candidateId: "1",
    candidate: mockCandidates[0],
    vacancyId: "vac1",
    vacancyTitle: "Senior Frontend Developer",
    lastMessage: {
      id: "msg1",
      chatId: "chat1",
      senderId: "emp1",
      senderType: "employer",
      content: "Дякуємо за інтерес до нашої вакансії! Коли вам було б зручно провести технічну співбесіду?",
      createdAt: "2026-01-28T15:30:00Z",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-01-28T15:30:00Z",
  },
  {
    id: "chat2",
    employerId: "emp1",
    candidateId: "3",
    candidate: mockCandidates[2],
    vacancyId: "vac2",
    vacancyTitle: "UI/UX Designer",
    lastMessage: {
      id: "msg2",
      chatId: "chat2",
      senderId: "3",
      senderType: "candidate",
      content: "Дякую за запрошення! Я готова на співбесіду в будь-який день наступного тижня.",
      createdAt: "2026-01-28T12:00:00Z",
      read: false,
    },
    unreadCount: 1,
    createdAt: "2026-01-27T11:00:00Z",
    updatedAt: "2026-01-28T12:00:00Z",
  },
  {
    id: "chat3",
    employerId: "emp1",
    candidateId: "6",
    candidate: mockCandidates[5],
    vacancyId: "vac3",
    vacancyTitle: "DevOps Engineer",
    lastMessage: {
      id: "msg3",
      chatId: "chat3",
      senderId: "6",
      senderType: "candidate",
      content: "Чи можете надіслати більше деталей про інфраструктуру компанії?",
      createdAt: "2026-01-27T18:00:00Z",
      read: false,
    },
    unreadCount: 2,
    createdAt: "2026-01-26T16:00:00Z",
    updatedAt: "2026-01-27T18:00:00Z",
  },
]

// Мокові повідомлення для чату
export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg1",
    chatId: "chat1",
    senderId: "emp1",
    senderType: "employer",
    content: "Вітаємо! Ми переглянули ваше резюме і воно нас дуже зацікавило.",
    createdAt: "2026-01-25T10:00:00Z",
    read: true,
  },
  {
    id: "msg2",
    chatId: "chat1",
    senderId: "1",
    senderType: "candidate",
    content: "Дякую за зворотній звязок! Я дуже зацікавлена у цій позиції.",
    createdAt: "2026-01-25T11:30:00Z",
    read: true,
  },
  {
    id: "msg3",
    chatId: "chat1",
    senderId: "emp1",
    senderType: "employer",
    content: "Чудово! Хочемо запросити вас на технічну співбесіду.",
    createdAt: "2026-01-26T09:00:00Z",
    read: true,
  },
  {
    id: "msg4",
    chatId: "chat1",
    senderId: "emp1",
    senderType: "employer",
    content: "Дякуємо за інтерес до нашої вакансії! Коли вам було б зручно провести технічну співбесіду?",
    createdAt: "2026-01-28T15:30:00Z",
    read: true,
  },
]

// Мокове сховище матеріалів
export const mockStorageMaterials: StorageMaterial[] = [
  {
    id: "mat1",
    employerId: "emp1",
    title: "Опис вакансії Frontend Developer",
    description: "Детальний опис вакансії з вимогами та умовами",
    type: "document",
    category: "job_description",
    url: "/materials/frontend-job.pdf",
    fileSize: 245000,
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "mat2",
    employerId: "emp1",
    title: "Презентація компанії TechCorp",
    description: "Інформація про компанію, команду та культуру",
    type: "document",
    category: "company_info",
    url: "/materials/techcorp-presentation.pdf",
    fileSize: 5200000,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "mat3",
    employerId: "emp1",
    title: "Тестове завдання Frontend",
    description: "Тестове завдання для кандидатів на позицію Frontend Developer",
    type: "document",
    category: "test_task",
    url: "/materials/frontend-test-task.pdf",
    fileSize: 125000,
    createdAt: "2026-01-18T10:00:00Z",
  },
  {
    id: "mat4",
    employerId: "emp1",
    title: "Фото офісу",
    description: "Фотографії нашого офісу в Києві",
    type: "image",
    category: "company_info",
    url: "/materials/office-photos.zip",
    fileSize: 15000000,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "mat5",
    employerId: "emp1",
    title: "Відео про компанію",
    description: "Короткий відеоролик про TechCorp Ukraine",
    type: "link",
    category: "company_info",
    url: "https://youtube.com/watch?v=example",
    createdAt: "2026-01-05T10:00:00Z",
  },
]

// Мокові тести
export const mockTests: Test[] = [
  {
    id: "test1",
    employerId: "emp1",
    title: "React & TypeScript Assessment",
    description: "Тест на знання React, TypeScript та сучасних практик розробки",
    type: "technical",
    duration: 60,
    questionsCount: 30,
    passingScore: 70,
    link: "https://testgorilla.com/test/react-typescript",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "test2",
    employerId: "emp1",
    title: "English Proficiency Test",
    description: "Тест на знання англійської мови (B2 рівень)",
    type: "language",
    duration: 45,
    questionsCount: 50,
    passingScore: 75,
    link: "https://efset.org/quick-check",
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "test3",
    employerId: "emp1",
    title: "Problem Solving & Logic",
    description: "Тест на логічне мислення та вирішення проблем",
    type: "logic",
    duration: 30,
    questionsCount: 20,
    passingScore: 60,
    link: "https://testgorilla.com/test/problem-solving",
    createdAt: "2026-01-12T10:00:00Z",
  },
]

// Мокові тести кандидатів
export const mockCandidateTests: CandidateTest[] = [
  {
    id: "ct1",
    testId: "test1",
    test: mockTests[0],
    candidateId: "1",
    vacancyId: "vac1",
    status: "completed",
    score: 85,
    startedAt: "2026-01-26T14:00:00Z",
    completedAt: "2026-01-26T15:00:00Z",
    deadline: "2026-01-28T23:59:00Z",
  },
  {
    id: "ct2",
    testId: "test2",
    test: mockTests[1],
    candidateId: "1",
    vacancyId: "vac1",
    status: "completed",
    score: 92,
    startedAt: "2026-01-27T10:00:00Z",
    completedAt: "2026-01-27T10:40:00Z",
    deadline: "2026-01-29T23:59:00Z",
  },
  {
    id: "ct3",
    testId: "test3",
    test: mockTests[2],
    candidateId: "1",
    vacancyId: "vac1",
    status: "in_progress",
    startedAt: "2026-01-28T09:00:00Z",
    deadline: "2026-01-30T23:59:00Z",
  },
  {
    id: "ct4",
    testId: "test1",
    test: mockTests[0],
    candidateId: "2",
    vacancyId: "vac1",
    status: "not_started",
    deadline: "2026-02-01T23:59:00Z",
  },
]

// Мокові заявки кандидата на компанії
export const mockCompanyApplications: CompanyApplication[] = [
  {
    id: "app1",
    candidateId: "1",
    companyName: "TechCorp Ukraine",
    companyLogo: "/logos/techcorp.png",
    vacancyTitle: "Senior Frontend Developer",
    status: "interview",
    appliedAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-01-28T14:00:00Z",
    notes: "Призначено технічну співбесіду",
  },
  {
    id: "app2",
    candidateId: "1",
    companyName: "Google Ukraine",
    vacancyTitle: "Frontend Engineer",
    status: "sent",
    appliedAt: "2026-01-26T12:00:00Z",
    updatedAt: "2026-01-26T12:00:00Z",
  },
  {
    id: "app3",
    candidateId: "1",
    companyName: "EPAM Systems",
    vacancyTitle: "React Developer",
    status: "viewed",
    appliedAt: "2026-01-24T09:00:00Z",
    updatedAt: "2026-01-27T11:00:00Z",
  },
  {
    id: "app4",
    candidateId: "1",
    companyName: "SoftServe",
    vacancyTitle: "Middle Frontend Developer",
    status: "rejected",
    appliedAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-25T16:00:00Z",
    notes: "Потрібен більший досвід з Angular",
  },
  {
    id: "app5",
    candidateId: "1",
    companyName: "Grammarly",
    vacancyTitle: "Staff Frontend Engineer",
    status: "offer",
    appliedAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-28T10:00:00Z",
    notes: "Отримано оффер, розглядаю",
  },
]

// Мокові чорний список
export const mockBlacklistedCompanies: BlacklistedCompany[] = [
  {
    id: "bl1",
    candidateId: "1",
    companyName: "BadCompany LLC",
    reason: "Негативний досвід співбесіди, неповага до кандидатів",
    addedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "bl2",
    candidateId: "1",
    companyName: "ScamStartup",
    reason: "Шахрайська компанія, не платять зарплату",
    addedAt: "2025-12-15T10:00:00Z",
  },
]

// Мокові збережені матеріали кандидата
export const mockSavedMaterials: SavedMaterial[] = [
  {
    id: "sm1",
    candidateId: "1",
    title: "React Best Practices 2026",
    url: "https://react.dev/learn",
    category: "Навчання",
    notes: "Прочитати перед співбесідою",
    savedAt: "2026-01-25T10:00:00Z",
  },
  {
    id: "sm2",
    candidateId: "1",
    title: "TypeScript Handbook",
    url: "https://typescriptlang.org/docs/handbook",
    category: "Документація",
    savedAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "sm3",
    candidateId: "1",
    title: "System Design Interview",
    url: "https://github.com/donnemartin/system-design-primer",
    category: "Співбесіди",
    notes: "Підготовка до системного дизайну",
    savedAt: "2026-01-18T10:00:00Z",
  },
]

// Мокові проєкти кандидата
export const mockCandidateProjects: CandidateProject[] = [
  {
    id: "proj1",
    candidateId: "1",
    title: "E-commerce Platform",
    description: "Повнофункціональна e-commerce платформа з кошиком, оплатою та адмін-панеллю. Розроблена на React, Next.js та Stripe для платежів.",
    role: "Lead Frontend Developer",
    technologies: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "https://github.com/olena/ecommerce",
    startDate: "2024-06-01",
    endDate: "2024-12-01",
    isCurrent: false,
  },
  {
    id: "proj2",
    candidateId: "1",
    title: "Task Management App",
    description: "Додаток для управління завданнями з Kanban дошкою, реальним часом синхронізації та колаборацією.",
    role: "Frontend Developer",
    technologies: ["React", "Redux", "Socket.io", "Material UI"],
    link: "https://taskmaster.demo",
    startDate: "2025-01-01",
    isCurrent: true,
  },
  {
    id: "proj3",
    candidateId: "1",
    title: "Portfolio Website",
    description: "Персональний сайт-портфоліо з анімаціями та 3D елементами",
    role: "Designer & Developer",
    technologies: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
    link: "https://olena-portfolio.com",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    isCurrent: false,
  },
]

// Хелпер функції для нових даних
export function getVacanciesByEmployerId(employerId: string): Vacancy[] {
  return mockVacancies.filter(v => v.employerId === employerId)
}

export function getInterviewsByEmployerId(employerId: string): Interview[] {
  return mockInterviews
}

export function getChatsByEmployerId(employerId: string): Chat[] {
  return mockChats.filter(c => c.employerId === employerId)
}

export function getChatMessages(chatId: string): ChatMessage[] {
  return mockChatMessages.filter(m => m.chatId === chatId)
}

export function getTestsByEmployerId(employerId: string): Test[] {
  return mockTests.filter(t => t.employerId === employerId)
}

export function getCandidateTestsByCandidateId(candidateId: string): CandidateTest[] {
  return mockCandidateTests.filter(ct => ct.candidateId === candidateId)
}

export function getCompanyApplicationsByCandidateId(candidateId: string): CompanyApplication[] {
  return mockCompanyApplications.filter(ca => ca.candidateId === candidateId)
}

export function getBlacklistedCompaniesByCandidateId(candidateId: string): BlacklistedCompany[] {
  return mockBlacklistedCompanies.filter(bc => bc.candidateId === candidateId)
}

export function getCandidateProjectsByCandidateId(candidateId: string): CandidateProject[] {
  return mockCandidateProjects.filter(cp => cp.candidateId === candidateId)
}

// Статистика кандидата
export function getCandidateStats(candidateId: string) {
  const applications = getCompanyApplicationsByCandidateId(candidateId)
  return {
    total: applications.length,
    sent: applications.filter(a => a.status === "sent").length,
    viewed: applications.filter(a => a.status === "viewed").length,
    interview: applications.filter(a => a.status === "interview").length,
    offer: applications.filter(a => a.status === "offer").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    responseRate: Math.round((applications.filter(a => a.status !== "sent").length / applications.length) * 100) || 0,
  }
}

// Калькулятор зарплати
export const salaryData = {
  "Frontend Developer": { junior: 25000, middle: 55000, senior: 95000, lead: 130000 },
  "Backend Developer": { junior: 28000, middle: 60000, senior: 100000, lead: 140000 },
  "Full Stack Developer": { junior: 30000, middle: 65000, senior: 110000, lead: 150000 },
  "UI/UX Designer": { junior: 20000, middle: 45000, senior: 75000, lead: 100000 },
  "DevOps Engineer": { junior: 30000, middle: 60000, senior: 100000, lead: 140000 },
  "Product Manager": { junior: 35000, middle: 70000, senior: 120000, lead: 160000 },
  "QA Engineer": { junior: 20000, middle: 45000, senior: 75000, lead: 100000 },
  "Data Scientist": { junior: 35000, middle: 70000, senior: 120000, lead: 160000 },
}

export function calculateSalary(position: string, experience: number): { min: number; max: number; average: number } {
  const posData = salaryData[position as keyof typeof salaryData] || salaryData["Frontend Developer"]
  let level: "junior" | "middle" | "senior" | "lead"
  
  if (experience < 1) level = "junior"
  else if (experience < 3) level = "middle"
  else if (experience < 6) level = "senior"
  else level = "lead"
  
  const base = posData[level]
  return {
    min: Math.round(base * 0.85),
    max: Math.round(base * 1.15),
    average: base,
  }
}
