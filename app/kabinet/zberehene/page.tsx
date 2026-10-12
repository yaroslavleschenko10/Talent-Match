"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Trash2,
  ExternalLink,
  Search,
  Bookmark,
  BookmarkX,
} from "lucide-react"
import { mockSavedJobs } from "@/lib/mock-data"
import type { SavedJob } from "@/lib/mock-data"

function SavedJobCard({ job, onRemove }: { job: SavedJob; onRemove: (id: string) => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
  }

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {job.position}
              </h3>
              <p className="text-muted-foreground">{job.companyName}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  {job.salary}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(job.savedAt)}
            </Badge>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Деталі
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                onClick={() => onRemove(job.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ZberehenenePage() {
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRemove = (id: string) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== id))
  }

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Збережені вакансії</h1>
        <p className="text-muted-foreground">Вакансії, які вас зацікавили</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Пошук за назвою або компанією..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
        <Bookmark className="h-5 w-5 text-primary" />
        <span className="text-sm">
          Збережено <strong>{savedJobs.length}</strong> вакансій
        </span>
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <SavedJobCard key={job.id} job={job} onRemove={handleRemove} />
          ))}
        </div>
      ) : savedJobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookmarkX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Немає збережених вакансій</h3>
            <p className="text-muted-foreground mb-6">
              Зберігайте цікаві вакансії, щоб повернутися до них пізніше
            </p>
            <Button>Переглянути вакансії</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Нічого не знайдено</h3>
            <p className="text-muted-foreground">
              Спробуйте змінити пошуковий запит
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
