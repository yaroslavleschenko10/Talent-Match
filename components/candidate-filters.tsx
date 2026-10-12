"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Search } from "lucide-react"
import { allLocations, allSkills } from "@/lib/mock-data"

interface CandidateFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  position: string
  location: string
  minExperience: number
  skills: string[]
}

export function CandidateFilters({ onFilterChange }: CandidateFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    position: "",
    location: "all",
    minExperience: 0,
    skills: [],
  })

  const [skillInput, setSkillInput] = useState("")

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      updateFilters({ skills: [...filters.skills, skill] })
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    updateFilters({ skills: filters.skills.filter((s) => s !== skill) })
  }

  const resetFilters = () => {
    const reset = {
      position: "",
      location: "all",
      minExperience: 0,
      skills: [],
    }
    setFilters(reset)
    setSkillInput("")
    onFilterChange(reset)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Фільтри</h2>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Скинути
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="position">Посада</Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="position"
                placeholder="Наприклад: Frontend Developer"
                value={filters.position}
                onChange={(e) => updateFilters({ position: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Місто</Label>
            <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
              <SelectTrigger id="location" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі міста</SelectItem>
                {allLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience">Мінімальний досвід (років)</Label>
            <Select
              value={filters.minExperience.toString()}
              onValueChange={(value) => updateFilters({ minExperience: Number.parseInt(value) })}
            >
              <SelectTrigger id="experience" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Без досвіду</SelectItem>
                <SelectItem value="1">1+ рік</SelectItem>
                <SelectItem value="2">2+ роки</SelectItem>
                <SelectItem value="3">3+ роки</SelectItem>
                <SelectItem value="5">5+ років</SelectItem>
                <SelectItem value="7">7+ років</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="skills">Навички</Label>
            <div className="space-y-2 mt-1.5">
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder="Додати навичку"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill(skillInput)
                    }
                  }}
                  list="skills-list"
                />
                <Button type="button" size="sm" onClick={() => addSkill(skillInput)}>
                  Додати
                </Button>
              </div>
              <datalist id="skills-list">
                {allSkills.map((skill) => (
                  <option key={skill} value={skill} />
                ))}
              </datalist>

              {filters.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
