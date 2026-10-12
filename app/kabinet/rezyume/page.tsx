"use client"

import { useState } from "react"
import { mockCandidates } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Eye, Download, FileText } from "lucide-react"
import { CvUpload } from "@/components/cv-upload"
import { useAuth } from "@/lib/auth-context"

const currentUser = mockCandidates[0]

export default function RezyumePage() {
  const { candidateProfile } = useAuth()
  const [cvUrl, setCvUrl] = useState<string | null>(candidateProfile?.cvFileUrl || currentUser.cvFile || null)
  const [summary, setSummary] = useState(currentUser.summary)
  const [skills, setSkills] = useState(currentUser.skills)
  const [skillInput, setSkillInput] = useState("")
  const [workHistory, setWorkHistory] = useState(currentUser.workHistory)
  const [education, setEducation] = useState(currentUser.education)
  const [saved, setSaved] = useState(false)

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) {
      setSkills([...skills, s])
      setSkillInput("")
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Редактор резюме</h1>
          <p className="text-muted-foreground">Оновіть інформацію, яку бачать роботодавці</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Переглянути
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {saved ? "Збережено!" : "Зберегти"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Файл резюме
          </CardTitle>
          <CardDescription>PDF, DOC або DOCX · до 5 МБ</CardDescription>
        </CardHeader>
        <CardContent>
          <CvUpload value={cvUrl} onChange={setCvUrl} persist />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Про мене</CardTitle>
          <CardDescription>Короткий опис для роботодавців</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Розкажіть про свій досвід..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Навички</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
                {skill}
                <button
                  type="button"
                  onClick={() => setSkills(skills.filter((s) => s !== skill))}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Додати навичку"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button type="button" variant="outline" onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Досвід роботи</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {workHistory.map((work, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-2 p-4 rounded-xl border border-border">
              <div className="space-y-2">
                <Label>Посада</Label>
                <Input
                  value={work.position}
                  onChange={(e) => {
                    const next = [...workHistory]
                    next[i] = { ...work, position: e.target.value }
                    setWorkHistory(next)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Компанія</Label>
                <Input
                  value={work.company}
                  onChange={(e) => {
                    const next = [...workHistory]
                    next[i] = { ...work, company: e.target.value }
                    setWorkHistory(next)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Період</Label>
                <Input
                  value={work.period}
                  onChange={(e) => {
                    const next = [...workHistory]
                    next[i] = { ...work, period: e.target.value }
                    setWorkHistory(next)
                  }}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Опис</Label>
                <Textarea
                  rows={2}
                  value={work.description}
                  onChange={(e) => {
                    const next = [...workHistory]
                    next[i] = { ...work, description: e.target.value }
                    setWorkHistory(next)
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setWorkHistory([
                ...workHistory,
                { company: "", position: "", period: "", description: "" },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Додати місце роботи
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Освіта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-2 p-4 rounded-xl border border-border">
              <div className="space-y-2">
                <Label>Навчальний заклад</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const next = [...education]
                    next[i] = { ...edu, institution: e.target.value }
                    setEducation(next)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Ступінь</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const next = [...education]
                    next[i] = { ...edu, degree: e.target.value }
                    setEducation(next)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Спеціальність</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => {
                    const next = [...education]
                    next[i] = { ...edu, field: e.target.value }
                    setEducation(next)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Рік</Label>
                <Input
                  type="number"
                  value={edu.year}
                  onChange={(e) => {
                    const next = [...education]
                    next[i] = { ...edu, year: Number(e.target.value) }
                    setEducation(next)
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
