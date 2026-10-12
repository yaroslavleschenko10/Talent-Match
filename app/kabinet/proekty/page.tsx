"use client"

import { useState } from "react"
import {
  getCandidateProjectsByCandidateId,
  type CandidateProject,
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ExternalLink, FolderKanban, Plus, Calendar } from "lucide-react"

const CANDIDATE_ID = "1"

export default function ProektyPage() {
  const [projects, setProjects] = useState<CandidateProject[]>(
    getCandidateProjectsByCandidateId(CANDIDATE_ID)
  )
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    role: "",
    technologies: "",
    link: "",
    startDate: "",
    isCurrent: true,
  })

  const handleAdd = () => {
    if (!form.title.trim()) return
    const newProject: CandidateProject = {
      id: `proj${Date.now()}`,
      candidateId: CANDIDATE_ID,
      title: form.title,
      description: form.description,
      role: form.role,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: form.link || undefined,
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      isCurrent: form.isCurrent,
    }
    setProjects([newProject, ...projects])
    setForm({
      title: "",
      description: "",
      role: "",
      technologies: "",
      link: "",
      startDate: "",
      isCurrent: true,
    })
    setOpen(false)
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", { month: "short", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Мої проєкти</h1>
          <p className="text-muted-foreground">Портфоліо проєктів для роботодавців</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Додати проєкт
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Новий проєкт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Назва *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="space-y-2">
                <Label>Роль</Label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Опис</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Технології (через кому)</Label>
                <Input
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="React, TypeScript, Next.js"
                />
              </div>
              <div className="space-y-2">
                <Label>Посилання</Label>
                <Input
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Дата початку</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleAdd}>Зберегти</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Проєктів ще немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-primary/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  {project.isCurrent && (
                    <Badge className="bg-accent text-accent-foreground shrink-0">Поточний</Badge>
                  )}
                </div>
                <p className="text-sm text-primary font-medium">{project.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(project.startDate)}
                    {project.endDate
                      ? ` — ${formatDate(project.endDate)}`
                      : project.isCurrent
                        ? " — досі"
                        : ""}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Відкрити
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
