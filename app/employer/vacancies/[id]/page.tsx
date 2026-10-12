"use client"

import { use, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  mockVacancies,
  employmentTypeLabels,
  workScheduleLabels,
  type CandidateStatus,
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Star,
  Circle,
} from "lucide-react"

const statusLabels: Record<CandidateStatus, string> = {
  recommended: "Рекомендований",
  potential: "Потенційний",
  rejected: "Відхилений",
  new: "Новий",
}

const statusColors: Record<CandidateStatus, string> = {
  recommended: "bg-green-500/15 text-green-400",
  potential: "bg-primary/20 text-primary",
  rejected: "bg-destructive/15 text-destructive",
  new: "bg-muted text-muted-foreground",
}

export default function VacancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const vacancy = useMemo(() => mockVacancies.find((v) => v.id === id), [id])

  if (!vacancy) {
    notFound()
  }

  const formatSalary = (min: number, max: number) =>
    `${new Intl.NumberFormat("uk-UA").format(min)} – ${new Intl.NumberFormat("uk-UA").format(max)} грн`

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/employer/vacancies">
          <ArrowLeft className="h-4 w-4 mr-2" />
          До вакансій
        </Link>
      </Button>

      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold">{vacancy.title}</h1>
          <Badge
            className={
              vacancy.status === "active"
                ? "bg-green-500/15 text-green-400"
                : "bg-muted text-muted-foreground"
            }
          >
            {vacancy.status === "active" ? "Активна" : vacancy.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{vacancy.department}</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Опис</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{vacancy.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Вимоги</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vacancy.requirements.map((req) => (
                <div key={req.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {req.required ? (
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm">{req.name}</span>
                    {req.required && (
                      <Badge variant="outline" className="text-[10px]">
                        обов&apos;язково
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-24">
                    <Progress value={req.weight * 10} className="h-1.5" />
                    <span className="text-xs text-muted-foreground">{req.weight}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Кандидати ({vacancy.candidates.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vacancy.candidates.map((vc) => (
                <div
                  key={vc.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/40 transition-colors"
                >
                  <Image
                    src={vc.candidate.avatar || "/placeholder.svg"}
                    alt={vc.candidate.name}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Link
                        href={`/kandydaty/${vc.candidate.id}`}
                        className="font-semibold hover:text-primary"
                      >
                        {vc.candidate.name}
                      </Link>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[vc.status]}`}>
                        {statusLabels[vc.status]}
                      </span>
                    </div>
                    <p className="text-sm text-primary">{vc.candidate.position}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Match {vc.matchScore}%</span>
                      <Progress value={vc.matchScore} className="h-1.5 w-24" />
                    </div>
                    {vc.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{vc.notes}</p>
                    )}
                    {vc.rejectionReason && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" />
                        {vc.rejectionReason}
                      </p>
                    )}
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/kandydaty/${vc.candidate.id}`}>Профіль</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Деталі</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {vacancy.location}
                {vacancy.isRemote && " · Remote OK"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                {formatSalary(vacancy.salaryMin, vacancy.salaryMax)}
              </div>
              <p>Досвід: {vacancy.experienceMin}–{vacancy.experienceMax} років</p>
              <p>{employmentTypeLabels[vacancy.employmentType]}</p>
              <p>{workScheduleLabels[vacancy.workSchedule]}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {vacancy.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
