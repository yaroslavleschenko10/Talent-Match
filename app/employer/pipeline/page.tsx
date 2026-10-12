"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  mockPipelineStages,
  mockPipelineCandidates,
} from "@/lib/mock-data"
import { pipelineApi, mapCandidate, type ApiPipelineStage, type ApiPipelineCandidate } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

type Stage = { id: string; name: string; order: number; color: string }
type Item = {
  id: string
  stageId: string
  notes?: string
  candidate: { id: string; name: string; position: string; avatar: string }
}

export default function EmployerPipelinePage() {
  const { employerProfile } = useAuth()
  const [stages, setStages] = useState<Stage[]>(mockPipelineStages)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const empId = employerProfile?.id
      if (empId) {
        try {
          const [st, cand] = await Promise.all([
            pipelineApi.stages(empId),
            pipelineApi.candidates(empId),
          ])
          if (!cancelled) {
            setStages(
              st.map((s: ApiPipelineStage) => ({
                id: s.id,
                name: s.name,
                order: s.order,
                color: s.color,
              })),
            )
            setItems(
              cand.map((c: ApiPipelineCandidate) => ({
                id: c.id,
                stageId: c.stageId,
                notes: c.notes,
                candidate: c.candidate
                  ? {
                      id: c.candidate.id,
                      name: mapCandidate(c.candidate).name,
                      position: c.candidate.position,
                      avatar: c.candidate.avatarUrl || "/placeholder-user.jpg",
                    }
                  : { id: c.candidateId, name: "Кандидат", position: "", avatar: "/placeholder-user.jpg" },
              })),
            )
            return
          }
        } catch {
          /* fallback */
        }
      }
      if (!cancelled) {
        setStages(mockPipelineStages)
        setItems(
          mockPipelineCandidates
            .filter((c) => c.employerId === "emp1")
            .map((c) => ({
              id: c.id,
              stageId: c.stageId,
              notes: c.notes,
              candidate: {
                id: c.candidate.id,
                name: c.candidate.name,
                position: c.candidate.position,
                avatar: c.candidate.avatar,
              },
            })),
        )
      }
    })()
    return () => {
      cancelled = true
    }
  }, [employerProfile?.id])

  const byStage = useMemo(() => {
    const map: Record<string, Item[]> = {}
    for (const stage of stages) {
      map[stage.id] = items.filter((c) => c.stageId === stage.id)
    }
    return map
  }, [items, stages])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Воронка найму</h1>
          <p className="text-muted-foreground">Кандидати на різних етапах відбору</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/employer/candidates">
            <Users className="h-4 w-4 mr-2" />
            Знайти кандидатів
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="min-w-[260px] flex-1">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
              <h2 className="font-semibold text-sm">{stage.name}</h2>
              <Badge variant="secondary" className="ml-auto text-xs">
                {byStage[stage.id]?.length ?? 0}
              </Badge>
            </div>
            <div className="space-y-3 min-h-[200px] rounded-xl bg-muted/30 border border-border/50 p-3">
              {(byStage[stage.id] ?? []).map((item) => (
                <Card key={item.id} className="hover:border-primary/40 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Image
                        src={item.candidate.avatar || "/placeholder.svg"}
                        alt={item.candidate.name}
                        width={36}
                        height={36}
                        className="rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/kandydaty/${item.candidate.id}`}
                          className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.candidate.name}
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.candidate.position}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(byStage[stage.id] ?? []).length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">Немає кандидатів</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
