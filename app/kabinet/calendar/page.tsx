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
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react"

const CANDIDATE_ID = "1"

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

const statusVariant: Record<
  Interview["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  scheduled: "default",
  completed: "secondary",
  cancelled: "destructive",
  rescheduled: "outline",
}

export default function CalendarPage() {
  const interviews = useMemo(
    () =>
      mockInterviews
        .filter((i) => i.candidateId === CANDIDATE_ID)
        .sort(
          (a, b) =>
            a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
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
          <p className="text-muted-foreground">Ваші співбесіди та зустрічі</p>
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
            <p className="text-muted-foreground">Немає співбесід за обраним фільтром</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((interview) => (
            <Card key={interview.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-44 shrink-0 space-y-1">
                    <p className="font-semibold capitalize">{formatDate(interview.date)}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {interview.startTime} – {interview.endTime}
                    </p>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-lg">{interview.title}</h3>
                      <Badge variant="outline">{typeLabels[interview.type]}</Badge>
                      <Badge variant={statusVariant[interview.status]}>
                        {statusLabels[interview.status]}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {interview.meetingType === "offline" && interview.location ? (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {interview.location}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Video className="h-4 w-4" />
                          {interview.meetingType === "google_meet"
                            ? "Google Meet"
                            : interview.meetingType === "zoom"
                              ? "Zoom"
                              : "Microsoft Teams"}
                        </span>
                      )}
                      {interview.participants.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {interview.participants.join(", ")}
                        </span>
                      )}
                    </div>

                    {interview.notes && (
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                        {interview.notes}
                      </p>
                    )}

                    {interview.meetingLink && interview.status === "scheduled" && (
                      <Button size="sm" asChild>
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
