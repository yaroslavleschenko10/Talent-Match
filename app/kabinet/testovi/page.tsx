"use client"

import { useMemo, useState } from "react"
import {
  getCandidateTestsByCandidateId,
  type CandidateTest,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileCheck,
  Clock,
  Target,
  ExternalLink,
  CheckCircle2,
  PlayCircle,
  Circle,
} from "lucide-react"

const CANDIDATE_ID = "1"

const statusConfig: Record<
  CandidateTest["status"],
  { label: string; variant: "default" | "secondary" | "outline"; icon: typeof Circle }
> = {
  not_started: { label: "Не розпочато", variant: "outline", icon: Circle },
  in_progress: { label: "В процесі", variant: "default", icon: PlayCircle },
  completed: { label: "Завершено", variant: "secondary", icon: CheckCircle2 },
}

const typeLabels: Record<string, string> = {
  technical: "Технічний",
  soft_skills: "Soft skills",
  language: "Мова",
  logic: "Логіка",
}

export default function TestoviPage() {
  const tests = useMemo(() => getCandidateTestsByCandidateId(CANDIDATE_ID), [])
  const [filter, setFilter] = useState<"all" | CandidateTest["status"]>("all")

  const filtered =
    filter === "all" ? tests : tests.filter((t) => t.status === filter)

  const formatDeadline = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Тестові завдання</h1>
          <p className="text-muted-foreground">Тести від роботодавців</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Усі"],
              ["not_started", "Нові"],
              ["in_progress", "В процесі"],
              ["completed", "Завершені"],
            ] as const
          ).map(([key, label]) => (
            <Button
              key={key}
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Немає тестових завдань</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((ct) => {
            const conf = statusConfig[ct.status]
            const Icon = conf.icon
            const passed =
              ct.score !== undefined && ct.score >= ct.test.passingScore
            return (
              <Card key={ct.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg">{ct.test.title}</h3>
                        <Badge variant="outline">
                          {typeLabels[ct.test.type] ?? ct.test.type}
                        </Badge>
                        <Badge variant={conf.variant} className="gap-1">
                          <Icon className="h-3 w-3" />
                          {conf.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{ct.test.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {ct.test.duration} хв
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileCheck className="h-4 w-4" />
                          {ct.test.questionsCount} питань
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Target className="h-4 w-4" />
                          Прохідний бал: {ct.test.passingScore}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Дедлайн: {formatDeadline(ct.deadline)}
                      </p>
                      {ct.status === "completed" && ct.score !== undefined && (
                        <div className="space-y-1.5 max-w-xs">
                          <div className="flex justify-between text-sm">
                            <span>Результат</span>
                            <span
                              className={
                                passed ? "text-green-500 font-medium" : "text-destructive font-medium"
                              }
                            >
                              {ct.score}% {passed ? "✓ складено" : "✗ не складено"}
                            </span>
                          </div>
                          <Progress value={ct.score} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="shrink-0">
                      {ct.status !== "completed" && (
                        <Button asChild>
                          <a href={ct.test.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {ct.status === "in_progress" ? "Продовжити" : "Розпочати"}
                          </a>
                        </Button>
                      )}
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
