"use client"

import { useState, useEffect, useMemo } from "react"
import { CandidateCard } from "@/components/candidate-card"
import { CandidateFilters, type FilterState } from "@/components/candidate-filters"
import { filterCandidates, mockCandidates, type Candidate } from "@/lib/mock-data"
import { candidatesApi, mapCandidate } from "@/lib/api"
import { Users, Briefcase, TrendingUp, WifiOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CandidatesPage() {
  const [filters, setFilters] = useState<FilterState>({
    position: "",
    location: "all",
    minExperience: 0,
    skills: [],
  })
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [source, setSource] = useState<"api" | "mock">("mock")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await candidatesApi.list({
          position: filters.position || undefined,
          location: filters.location !== "all" ? filters.location : undefined,
          minExperience: filters.minExperience || undefined,
          skill: filters.skills[0],
        })
        if (!cancelled) {
          setCandidates(list.map(mapCandidate))
          setSource("api")
        }
      } catch {
        if (!cancelled) {
          setCandidates(filterCandidates(filters))
          setSource("mock")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [filters.position, filters.location, filters.minExperience, filters.skills])

  const filteredCandidates = useMemo(() => {
    if (source === "api") {
      // client-side skill filter if multiple skills selected
      if (filters.skills.length <= 1) return candidates
      return candidates.filter((c) =>
        filters.skills.every((s) =>
          c.skills.some((cs) => cs.toLowerCase().includes(s.toLowerCase())),
        ),
      )
    }
    return filterCandidates(filters)
  }, [candidates, filters, source])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <section className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-3">
              <Badge variant={source === "api" ? "default" : "secondary"} className="gap-1">
                {source === "api" ? "API" : (
                  <>
                    <WifiOff className="h-3 w-3" /> Мок-дані
                  </>
                )}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Знаходьте найкращих кандидатів для вашої команди
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Переглядайте резюме талановитих спеціалістів та надсилайте їм запити на співбесіду.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-accent">{filteredCandidates.length}+</div>
                <div className="text-sm text-muted-foreground">Кандидатів</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">15+</div>
                <div className="text-sm text-muted-foreground">Спеціальностей</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Успішність</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="lg:sticky lg:top-20 h-fit">
            <CandidateFilters onFilterChange={setFilters} />
          </aside>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {loading
                  ? "Завантаження..."
                  : filteredCandidates.length === candidates.length
                    ? "Всі кандидати"
                    : `Знайдено кандидатів: ${filteredCandidates.length}`}
              </h2>
              <p className="text-muted-foreground">
                Перегляньте резюме та надішліть запит на співбесіду
              </p>
            </div>

            {filteredCandidates.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-2">Кандидатів не знайдено</p>
                <p className="text-sm text-muted-foreground">Спробуйте змінити параметри фільтрів</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
