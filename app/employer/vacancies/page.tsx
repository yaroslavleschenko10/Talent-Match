"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getVacanciesByEmployerId,
  employmentTypeLabels,
  workScheduleLabels,
  type Vacancy,
} from "@/lib/mock-data"
import { vacanciesApi, type ApiVacancy } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Users, DollarSign, Plus, Pause, Play } from "lucide-react"

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Активна", className: "bg-green-500/15 text-green-400" },
  paused: { label: "Пауза", className: "bg-accent/20 text-accent" },
  closed: { label: "Закрита", className: "bg-muted text-muted-foreground" },
}

function mapVacancy(v: ApiVacancy): Vacancy {
  return {
    id: v.id,
    employerId: v.employerId,
    title: v.title,
    department: v.department || "",
    description: v.description,
    requirements: v.requirements || [],
    skills: v.skills || [],
    experienceMin: v.experienceMin,
    experienceMax: v.experienceMax,
    salaryMin: v.salaryMin || 0,
    salaryMax: v.salaryMax || 0,
    employmentType: v.employmentType as Vacancy["employmentType"],
    workSchedule: v.workSchedule as Vacancy["workSchedule"],
    location: v.location,
    isRemote: v.isRemote,
    status: v.status,
    candidates: (v.candidates || []).map((c) => ({
      id: c.id,
      candidateId: c.candidateId,
      candidate: c.candidate as never,
      status: c.status as never,
      matchScore: c.matchScore,
      rejectionReason: c.rejectionReason,
      notes: c.notes || "",
      appliedAt: c.appliedAt,
    })),
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  }
}

export default function VacanciesPage() {
  const { employerProfile } = useAuth()
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "closed">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const empId = employerProfile?.id
      if (empId) {
        try {
          const list = await vacanciesApi.list(empId)
          if (!cancelled) {
            setVacancies(list.map(mapVacancy))
            setLoading(false)
            return
          }
        } catch {
          /* fallback */
        }
      }
      if (!cancelled) {
        setVacancies(getVacanciesByEmployerId("emp1"))
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [employerProfile?.id])

  const filtered =
    filter === "all" ? vacancies : vacancies.filter((v) => v.status === filter)

  const formatSalary = (min: number, max: number) =>
    `${new Intl.NumberFormat("uk-UA").format(min)} – ${new Intl.NumberFormat("uk-UA").format(max)} грн`

  const togglePause = async (id: string, current: string) => {
    const next = current === "active" ? "paused" : "active"
    try {
      await vacanciesApi.setStatus(id, next)
    } catch {
      /* mock mode */
    }
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: next as Vacancy["status"] } : v)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Вакансії</h1>
          <p className="text-muted-foreground">Керуйте відкритими позиціями</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Усі ({vacancies.length})
          </Button>
          {(["active", "paused", "closed"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
            >
              {statusConfig[s].label} ({vacancies.filter((v) => v.status === s).length})
            </Button>
          ))}
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Нова вакансія
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Завантаження...</p>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Вакансій немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((v) => {
            const conf = statusConfig[v.status]
            return (
              <Card key={v.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link
                          href={`/employer/vacancies/${v.id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors"
                        >
                          {v.title}
                        </Link>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${conf.className}`}>
                          {conf.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{v.department}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {v.location}
                          {v.isRemote ? " · Remote" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          {formatSalary(v.salaryMin, v.salaryMax)}
                        </span>
                        <span>{employmentTypeLabels[v.employmentType]}</span>
                        <span>{workScheduleLabels[v.workSchedule]}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {v.candidates.length} кандидатів
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {(v.status === "active" || v.status === "paused") && (
                        <Button variant="outline" size="sm" onClick={() => togglePause(v.id, v.status)}>
                          {v.status === "active" ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" /> Пауза
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" /> Відновити
                            </>
                          )}
                        </Button>
                      )}
                      <Button size="sm" asChild>
                        <Link href={`/employer/vacancies/${v.id}`}>Деталі</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
