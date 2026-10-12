"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { filterCandidates, allLocations, allSkills } from "@/lib/mock-data"
import { CandidateCard } from "@/components/candidate-card"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Users } from "lucide-react"

export default function EmployerCandidatesPage() {
  const [position, setPosition] = useState("")
  const [location, setLocation] = useState("all")
  const [minExperience, setMinExperience] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const filtered = useMemo(
    () =>
      filterCandidates({
        position,
        location,
        minExperience,
        skills: selectedSkills,
      }),
    [position, location, minExperience, selectedSkills]
  )

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Кандидати</h1>
        <p className="text-muted-foreground">Шукайте таланти для вашої команди</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Посада..."
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Місто" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Усі міста</SelectItem>
                {allLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={String(minExperience)}
              onValueChange={(v) => setMinExperience(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Досвід" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Будь-який досвід</SelectItem>
                <SelectItem value="1">1+ рік</SelectItem>
                <SelectItem value="3">3+ роки</SelectItem>
                <SelectItem value="5">5+ років</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allSkills.slice(0, 12).map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Знайдено: {filtered.length}
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/kandydaty">Відкрити повний каталог</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((c) => (
          <CandidateCard key={c.id} candidate={c} />
        ))}
        {filtered.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              Кандидатів не знайдено
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
