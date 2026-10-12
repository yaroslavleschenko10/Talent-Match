"use client"

import { useMemo, useState } from "react"
import {
  getCompanyApplicationsByCandidateId,
  type CompanyApplication,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, FileText } from "lucide-react"

const CANDIDATE_ID = "1"

const statusConfig: Record<
  CompanyApplication["status"],
  { label: string; className: string }
> = {
  sent: { label: "Надіслано", className: "bg-muted text-muted-foreground" },
  viewed: { label: "Переглянуто", className: "bg-blue-500/15 text-blue-400" },
  interview: { label: "Співбесіда", className: "bg-primary/20 text-primary" },
  offer: { label: "Оффер", className: "bg-accent/20 text-accent" },
  rejected: { label: "Відхилено", className: "bg-destructive/15 text-destructive" },
  accepted: { label: "Прийнято", className: "bg-green-500/15 text-green-400" },
}

export default function KompaniiPage() {
  const apps = useMemo(() => getCompanyApplicationsByCandidateId(CANDIDATE_ID), [])
  const [filter, setFilter] = useState<"all" | CompanyApplication["status"]>("all")

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Мої заявки</h1>
          <p className="text-muted-foreground">Статус відгуків на вакансії</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Усі ({apps.length})
          </Button>
          {(Object.keys(statusConfig) as CompanyApplication["status"][]).map((key) => {
            const count = apps.filter((a) => a.status === key).length
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
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Заявок немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const conf = statusConfig[app.status]
            return (
              <Card key={app.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold">{app.vacancyTitle}</h3>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${conf.className}`}
                        >
                          {conf.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.companyName}</p>
                      {app.notes && (
                        <p className="text-sm text-muted-foreground mt-1 italic">{app.notes}</p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(app.appliedAt)}
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
