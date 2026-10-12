"use client"

import { useMemo } from "react"
import {
  getCandidateStats,
  getCompanyApplicationsByCandidateId,
  calculateSalary,
  mockCandidates,
} from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Eye,
  MessageSquare,
  Gift,
  XCircle,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calculator,
} from "lucide-react"

const CANDIDATE_ID = "1"
const user = mockCandidates[0]

export default function StatistikaPage() {
  const stats = useMemo(() => getCandidateStats(CANDIDATE_ID), [])
  const apps = useMemo(() => getCompanyApplicationsByCandidateId(CANDIDATE_ID), [])
  const salary = useMemo(
    () => calculateSalary(user.position, user.experience),
    []
  )

  const cards = [
    { label: "Усього заявок", value: stats.total, icon: Send, color: "text-primary" },
    { label: "Надіслано", value: stats.sent, icon: Send, color: "text-muted-foreground" },
    { label: "Переглянуто", value: stats.viewed, icon: Eye, color: "text-blue-400" },
    { label: "Співбесіди", value: stats.interview, icon: MessageSquare, color: "text-primary" },
    { label: "Оффери", value: stats.offer, icon: Gift, color: "text-accent" },
    { label: "Відхилено", value: stats.rejected, icon: XCircle, color: "text-destructive" },
    { label: "Прийнято", value: stats.accepted, icon: CheckCircle2, color: "text-green-400" },
    {
      label: "Response rate",
      value: `${stats.responseRate}%`,
      icon: Percent,
      color: "text-accent",
    },
  ]

  const formatSalary = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(n) + " грн"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Статистика</h1>
        <p className="text-muted-foreground">Аналітика вашої активності на платформі</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <Card key={c.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{c.value}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Воронка заявок
            </CardTitle>
            <CardDescription>Розподіл за статусами</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(
              [
                ["sent", "Надіслано", stats.sent],
                ["viewed", "Переглянуто", stats.viewed],
                ["interview", "Співбесіда", stats.interview],
                ["offer", "Оффер", stats.offer],
                ["rejected", "Відхилено", stats.rejected],
                ["accepted", "Прийнято", stats.accepted],
              ] as const
            ).map(([key, label, value]) => {
              const pct = stats.total ? Math.round((value / stats.total) * 100) : 0
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">
                      {value} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent" />
              Калькулятор зарплати
            </CardTitle>
            <CardDescription>
              Орієнтовна вилка для {user.position} ({user.experience}{" "}
              {user.experience === 1 ? "рік" : user.experience < 5 ? "роки" : "років"})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Мін.</p>
                <p className="font-semibold text-sm">{formatSalary(salary.min)}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/15 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Середня</p>
                <p className="font-bold text-primary">{formatSalary(salary.average)}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Макс.</p>
                <p className="font-semibold text-sm">{formatSalary(salary.max)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Ваша зазначена вилка: <Badge variant="outline">{user.salary}</Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Останні заявки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {apps.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{app.vacancyTitle}</p>
                  <p className="text-xs text-muted-foreground">{app.companyName}</p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {app.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
