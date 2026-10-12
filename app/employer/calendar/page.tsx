"use client"

import { useMemo, useState } from "react"
import { mockInterviews, type Interview } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Users,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const typeLabels: Record<Interview["type"], string> = {
  screening: "Скринінг",
  technical: "Технічна",
  hr: "HR",
  final: "Фінальна",
}

const statusLabels: Record<Interview["status"], string> = {
  scheduled: "Заплановано",
  completed: "Завершено",
  cancelled: "Скасовано",
  rescheduled: "Перенесено",
}

export default function EmployerCalendarPage() {
  const interviews = useMemo(
    () =>
      [...mockInterviews].sort(
        (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
      ),
    []
  )

  const [filter, setFilter] = useState<"all" | "scheduled" | "completed">("all")

  const filtered = interviews.filter((i) => {
    if (filter === "all") return true
    if (filter === "scheduled") return i.status === "scheduled" || i.status === "rescheduled"
    return i.status === "completed"
  })

  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("uk-UA", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Календар</h1>
          <p className="text-muted-foreground">Співбесіди з кандидатами</p>
        </div>
        <div className="flex gap-2">
          {(
            [
              ["all", "Усі"],
              ["scheduled", "Майбутні"],
              ["completed", "Минулі"],
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
            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Немає співбесід</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((interview) => (
            <Card key={interview.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-40 shrink-0 space-y-1">
                    <p className="font-semibold capitalize text-sm">{formatDate(interview.date)}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {interview.startTime} – {interview.endTime}
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{interview.title}</h3>
                      <Badge variant="outline">{typeLabels[interview.type]}</Badge>
                      <Badge variant={interview.status === "scheduled" ? "default" : "secondary"}>
                        {statusLabels[interview.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={interview.candidate.avatar || "/placeholder.svg"}
                        alt={interview.candidate.name}
                        width={28}
                        height={28}
                        className="rounded object-cover"
                      />
                      <Link
                        href={`/kandydaty/${interview.candidate.id}`}
                        className="text-sm hover:text-primary"
                      >
                        {interview.candidate.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        · {interview.candidate.position}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Video className="h-4 w-4" />
                        {interview.meetingType}
                      </span>
                      {interview.participants.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {interview.participants.join(", ")}
                        </span>
                      )}
                    </div>
                    {interview.meetingLink && interview.status === "scheduled" && (
                      <Button size="sm" className="mt-1" asChild>
                        <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Приєднатися
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
