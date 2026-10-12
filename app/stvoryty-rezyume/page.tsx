"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, MapPin, DollarSign, GraduationCap, Mail, Phone, Plus, X, CheckCircle2, FileText } from "lucide-react"
import { CvUpload } from "@/components/cv-upload"

export default function CreateResumePage() {
  const [submitted, setSubmitted] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [languages, setLanguages] = useState<string[]>([])
  const [languageInput, setLanguageInput] = useState("")
  const [cvUrl, setCvUrl] = useState<string | null>(null)

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages([...languages, languageInput.trim()])
      setLanguageInput("")
    }
  }

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((l) => l !== language))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-accent">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Резюме створено!</h2>
            <p className="text-muted-foreground mb-6">
              Ваше резюме успішно додано до бази кандидатів. Роботодавці зможуть переглянути його та надіслати вам
              запити на співбесіду.
            </p>
            <Button asChild className="w-full">
              <a href="/kandydaty">Переглянути всіх кандидатів</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Створити резюме</h1>
            <p className="text-muted-foreground text-lg">
              Заповніть інформацію про себе, щоб роботодавці могли знайти вас
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Особиста інформація
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Повне ім'я *</Label>
                  <Input id="name" placeholder="Іван Петренко" required className="mt-1.5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="ivan@email.com" required className="pl-9" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+380 67 123 4567" required className="pl-9" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* CV File */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Файл резюме
                </CardTitle>
                <CardDescription>Завантажте PDF або Word (до 5 МБ)</CardDescription>
              </CardHeader>
              <CardContent>
                <CvUpload value={cvUrl} onChange={setCvUrl} persist />
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Професійна інформація
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="position">Бажана посада *</Label>
                  <Input id="position" placeholder="Frontend Developer" required className="mt-1.5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Досвід роботи (років) *</Label>
                    <Input id="experience" type="number" min="0" placeholder="3" required className="mt-1.5" />
                  </div>

                  <div>
                    <Label htmlFor="location">Місто *</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="Київ" required className="pl-9" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="salary">Очікувана зарплата *</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="salary" placeholder="80 000 - 100 000 грн" required className="pl-9" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="summary">Про себе *</Label>
                  <Textarea
                    id="summary"
                    placeholder="Розкажіть про свій досвід, досягнення та професійні цілі..."
                    required
                    rows={4}
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Навички</CardTitle>
                <CardDescription>Додайте ключові навички та технології</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Наприклад: React, TypeScript, Node.js"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education & Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Освіта та мови
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="education">Освіта *</Label>
                  <Input
                    id="education"
                    placeholder="Київський Політехнічний Інститут, Комп'ютерні науки"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Мови</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      placeholder="Наприклад: Українська (рідна)"
                      value={languageInput}
                      onChange={(e) => setLanguageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addLanguage()
                        }
                      }}
                    />
                    <Button type="button" onClick={addLanguage} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {languages.map((language) => (
                        <Badge key={language} variant="outline" className="gap-1 px-3 py-1">
                          {language}
                          <button
                            type="button"
                            onClick={() => removeLanguage(language)}
                            className="hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">
              Створити резюме
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
