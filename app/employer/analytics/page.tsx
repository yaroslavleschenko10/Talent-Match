"use client"

import { mockAnalytics, mockVacancies, mockPipelineCandidates } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Clock,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  Hourglass,
} from "lucide-react"

const EMP_ID = "emp1"

export default function EmployerAnalyticsPage() {
  const a = mockAnalytics
  const vacancies = mockVacancies.filter((v) => v.employerId === EMP_ID)
  const pipeline = mockPipelineCandidates.filter((c) => c.employerId === EMP_ID)
  const totalCandidatesOnVacancies = vacancies.reduce((s, v) => s + v.candidates.length, 0)

  const kpis = [
    { label: "Усього запитів", value: a.totalRequests, icon: TrendingUp },
    { label: "Прийнято", value: a.accepted, icon: CheckCircle2, color: "text-green-400" },
    { label: "Відхилено", value: a.rejected, icon: XCircle, color: "text-destructive" },
    { label: "В очікуванні", value: a.pending, icon: Hourglass, color: "text-accent" },
    { label: "Активні вакансії", value: vacancies.filter((v) => v.status === "active").length, icon: Briefcase },
    { label: "У воронці", value: pipeline.length, icon: Users },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Аналітика</h1>
        <p className="text-muted-foreground">Метрики ефективності найму</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <Card key={k.label}>
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                  <Icon className={`h-5 w-5 ${k.color ?? "text-primary"}`} />
                </div>
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="text-sm text-muted-foreground">{k.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Конверсія запитів</CardTitle>
            <CardDescription>Розподіл відповідей кандидатів</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Прийнято", a.accepted, "bg-green-500"],
              ["Відхилено", a.rejected, "bg-destructive"],
              ["В очікуванні", a.pending, "bg-accent"],
            ].map(([label, value, color]) => {
              const pct = Math.round((Number(value) / a.totalRequests) * 100)
              return (
                <div key={label as string} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">
                      {value} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 pt-2">
              <Clock className="h-4 w-4" />
              Середній час відповіді: {a.averageResponseTime} дні
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Причини відмов</CardTitle>
            <CardDescription>Топ причин відхилення запитів</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {a.topRejectionReasons.map((r) => (
              <div key={r.reason} className="flex items-center justify-between text-sm">
                <span>{r.reason}</span>
                <span className="font-medium text-muted-foreground">{r.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Вакансії та кандидати</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {vacancies.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <div>
                <p className="font-medium text-sm">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.department}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {v.candidates.length} кандидатів · match avg{" "}
                {v.candidates.length
                  ? Math.round(
                      v.candidates.reduce((s, c) => s + c.matchScore, 0) / v.candidates.length
                    )
                  : 0}
                %
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2">
            Усього кандидатів на вакансіях: {totalCandidatesOnVacancies}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
