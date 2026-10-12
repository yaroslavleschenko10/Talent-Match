"use client"

import { useEffect, useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { getCandidateById, type Candidate } from "@/lib/mock-data"
import { candidatesApi, mapCandidate, requestsApi, fileUrl } from "@/lib/api"
import { EmployerRequestForm } from "@/components/employer-request-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Languages,
  Mail,
  Phone,
  Linkedin,
  Globe,
  ArrowLeft,
  Calendar,
  FileText,
} from "lucide-react"

export default function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const c = await candidatesApi.one(id)
        if (!cancelled) setCandidate(mapCandidate(c))
      } catch {
        const mock = getCandidateById(id)
        if (!cancelled) {
          if (mock) setCandidate(mock)
          else setNotFound(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Завантаження...
      </div>
    )
  }

  if (notFound || !candidate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Кандидата не знайдено</p>
        <Button asChild variant="outline">
          <Link href="/kandydaty">До списку</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/kandydaty">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Повернутися до списку
          </Link>
        </Button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Image
                    src={candidate.avatar || "/placeholder.svg"}
                    alt={candidate.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h1 className="text-3xl font-bold mb-1">
                          {candidate.name}
                          {candidate.middleName ? ` ${candidate.middleName}` : ""}
                        </h1>
                        <p className="text-xl text-primary font-medium">{candidate.position}</p>
                      </div>
                      {candidate.available ? (
                        <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">
                          Доступний для співпраці
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          Наразі зайнятий
                        </Badge>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>
                          {candidate.experience}{" "}
                          {candidate.experience === 1
                            ? "рік"
                            : candidate.experience < 5
                              ? "роки"
                              : "років"}{" "}
                          досвіду
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{candidate.salary || "—"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Про мене</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {candidate.summary || "Опис відсутній"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Навички</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {candidate.workHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Досвід роботи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.workHistory.map((work, index) => (
                      <div
                        key={index}
                        className="relative pl-6 border-l-2 border-primary/20 pb-6 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold">{work.position}</h3>
                            <p className="text-sm text-primary">{work.company}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                            <Calendar className="h-3.5 w-3.5" />
                            {work.period}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {work.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {candidate.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Освіта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.degree}, {edu.field} · {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {candidate.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Мови
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.languages.map((lang) => (
                      <Badge key={lang.language} variant="outline">
                        {lang.language} — {lang.level}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактна інформація</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {candidate.email && (
                  <a
                    href={`mailto:${candidate.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm break-all">{candidate.email}</span>
                  </a>
                )}
                {candidate.phone && (
                  <a
                    href={`tel:${candidate.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-sm">{candidate.phone}</span>
                  </a>
                )}
                {candidate.linkedin && (
                  <a
                    href={
                      candidate.linkedin.startsWith("http")
                        ? candidate.linkedin
                        : `https://${candidate.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="text-sm break-all">{candidate.linkedin}</span>
                  </a>
                )}
                {candidate.portfolio && (
                  <a
                    href={
                      candidate.portfolio.startsWith("http")
                        ? candidate.portfolio
                        : `https://${candidate.portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm break-all">{candidate.portfolio}</span>
                  </a>
                )}
              </CardContent>
            </Card>

            {candidate.cvFile && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Резюме</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a
                      href={fileUrl(candidate.cvFile) || candidate.cvFile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      Завантажити / переглянути CV
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            <EmployerRequestForm
              candidateId={candidate.id}
              candidateName={candidate.name}
              candidatePosition={candidate.position}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
