"use client"

import Link from "next/link"
import {
  mockAnalytics,
  mockVacancies,
  mockInterviews,
  mockChats,
  mockPipelineCandidates,
  mockEmployers,
} from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Clock,
  ArrowRight,
  GitBranch,
} from "lucide-react"

const EMP_ID = "emp1"

export default function EmployerDashboardPage() {
  const vacancies = mockVacancies.filter((v) => v.employerId === EMP_ID)
  const activeVacancies = vacancies.filter((v) => v.status === "active")
  const pipelineCount = mockPipelineCandidates.filter((c) => c.employerId === EMP_ID).length
  const interviews = mockInterviews.filter(
    (i) => i.status === "scheduled" && mockVacancies.some((v) => v.id === i.vacancyId && v.employerId === EMP_ID)
  )
  const unreadChats = mockChats.filter((c) => c.employerId === EMP_ID && c.unreadCount > 0)
  const company = mockEmployers[0]
  const a = mockAnalytics

  const stats = [
    { label: "Активні вакансії", value: activeVacancies.length, icon: Briefcase, href: "/employer/vacancies" },
    { label: "У воронці", value: pipelineCount, icon: GitBranch, href: "/employer/pipeline" },
    { label: "Співбесіди", value: interviews.length, icon: Calendar, href: "/employer/calendar" },
    { label: "Непрочитані чати", value: unreadChats.reduce((s, c) => s + c.unreadCount, 0), icon: MessageSquare, href: "/employer/chats" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground">
          Огляд найму · {company?.companyName}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.label} href={s.href}>
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Запити до кандидатів
            </CardTitle>
            <CardDescription>Статистика відповідей</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Усього", a.totalRequests, "bg-primary"],
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
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-2">
              <Clock className="h-3.5 w-3.5" />
              Середній час відповіді: {a.averageResponseTime} дні
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Найближчі співбесіди</CardTitle>
              <CardDescription>Заплановані зустрічі</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/employer/calendar">
                Усі <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {interviews.slice(0, 4).map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{i.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.candidate.name} · {i.date} {i.startTime}
                  </p>
                </div>
                <Badge variant="outline">{i.type}</Badge>
              </div>
            ))}
            {interviews.length === 0 && (
              <p className="text-sm text-muted-foreground">Немає запланованих співбесід</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Активні вакансії</CardTitle>
            <CardDescription>Кандидати на кожній позиції</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employer/vacancies">
              Усі <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeVacancies.map((v) => (
              <Link
                key={v.id}
                href={`/employer/vacancies/${v.id}`}
                className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{v.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {v.department} · {v.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{v.candidates.length} кандидатів</Badge>
                  <Badge className="bg-green-500/15 text-green-400 hover:bg-green-500/15">
                    Активна
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
