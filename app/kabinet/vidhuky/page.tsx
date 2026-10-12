"use client"

import { useMemo, useState } from "react"
import {
  getRequestsByCandidateId,
  employmentTypeLabels,
  workScheduleLabels,
  type EmployerRequest,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Inbox,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Check,
  X,
  MessageSquare,
} from "lucide-react"

const CANDIDATE_ID = "1"

const statusConfig: Record<
  EmployerRequest["status"],
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  pending: { label: "Очікує", variant: "outline" },
  accepted: { label: "Прийнято", variant: "default" },
  rejected: { label: "Відхилено", variant: "destructive" },
  interview: { label: "Співбесіда", variant: "secondary" },
}

export default function VidhukyPage() {
  const [requests, setRequests] = useState(() => getRequestsByCandidateId(CANDIDATE_ID))
  const [filter, setFilter] = useState<"all" | EmployerRequest["status"]>("all")

  const filtered =
    filter === "all" ? requests : requests.filter((r) => r.status === filter)

  const respond = (id: string, status: "accepted" | "rejected" | "interview") => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
      )
    )
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Мої відгуки</h1>
          <p className="text-muted-foreground">Запити від роботодавців</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Усі ({requests.length})
          </Button>
          {(Object.keys(statusConfig) as EmployerRequest["status"][]).map((key) => {
            const count = requests.filter((r) => r.status === key).length
            if (!count) return null
            return (
              <Button
                key={key}
                size="sm"
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key)}
              >
                {statusConfig[key].label} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Відгуків поки немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => {
            const conf = statusConfig[req.status]
            return (
              <Card key={req.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{req.companyName}</h3>
                        <p className="text-primary font-medium">{req.position}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {req.contactPerson} · {formatDate(req.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={conf.variant}>{conf.label}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {req.salaryRange && (
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" />
                        {req.salaryRange}
                      </span>
                    )}
                    <span>{employmentTypeLabels[req.employmentType]}</span>
                    <span>{workScheduleLabels[req.workSchedule]}</span>
                  </div>

                  <p className="text-sm bg-muted/50 rounded-lg p-3">{req.message}</p>

                  <div className="flex flex-wrap gap-3 text-sm">
                    <a
                      href={`mailto:${req.email}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                      {req.email}
                    </a>
                    <a
                      href={`tel:${req.phone}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                    >
                      <Phone className="h-4 w-4" />
                      {req.phone}
                    </a>
                  </div>

                  {req.status === "pending" && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button size="sm" onClick={() => respond(req.id, "accepted")}>
                        <Check className="h-4 w-4 mr-1" />
                        Прийняти
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => respond(req.id, "interview")}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        На співбесіду
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => respond(req.id, "rejected")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Відхилити
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
