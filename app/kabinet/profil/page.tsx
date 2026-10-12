"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Languages,
  Upload,
  Save,
  X,
  Plus,
  MessageCircle,
  FileText,
} from "lucide-react"
import { mockCandidates, employmentTypeLabels, workScheduleLabels } from "@/lib/mock-data"
import { CvUpload } from "@/components/cv-upload"
import { useAuth } from "@/lib/auth-context"
import { fileUrl } from "@/lib/api"
import type { EmploymentType, WorkSchedule } from "@/lib/mock-data"

// Використовуємо першого кандидата як поточного користувача
const currentUser = mockCandidates[0]

export default function ProfilPage() {
  const { candidateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [cvUrl, setCvUrl] = useState<string | null>(candidateProfile?.cvFileUrl || currentUser.cvFile || null)
  const [profile, setProfile] = useState({
    name: currentUser.name,
    middleName: currentUser.middleName || "",
    birthDate: currentUser.birthDate,
    gender: currentUser.gender,
    email: currentUser.email,
    phone: currentUser.phone,
    telegram: currentUser.telegram || "",
    viber: currentUser.viber || "",
    linkedin: currentUser.linkedin || "",
    portfolio: currentUser.portfolio || "",
    position: currentUser.position,
    experience: currentUser.experience,
    location: currentUser.location,
    relocate: currentUser.relocate,
    salary: currentUser.salary,
    employmentType: currentUser.employmentType,
    workSchedule: currentUser.workSchedule,
    summary: currentUser.summary,
    available: currentUser.available,
    profileVisible: currentUser.profileVisible,
    showSalary: currentUser.showSalary,
    showContacts: currentUser.showContacts,
  })

  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState(currentUser.skills)

  const handleSave = () => {
    setIsEditing(false)
    // Тут буде логіка збереження
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const toggleEmploymentType = (type: EmploymentType) => {
    if (profile.employmentType.includes(type)) {
      setProfile({ ...profile, employmentType: profile.employmentType.filter((t) => t !== type) })
    } else {
      setProfile({ ...profile, employmentType: [...profile.employmentType, type] })
    }
  }

  const toggleWorkSchedule = (schedule: WorkSchedule) => {
    if (profile.workSchedule.includes(schedule)) {
      setProfile({ ...profile, workSchedule: profile.workSchedule.filter((s) => s !== schedule) })
    } else {
      setProfile({ ...profile, workSchedule: [...profile.workSchedule, schedule] })
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Мій профіль</h1>
          <p className="text-muted-foreground">Керуйте своїми даними та налаштуваннями видимості</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={profile.available}
              onCheckedChange={(checked) => setProfile({ ...profile, available: checked })}
            />
            <span className="text-sm font-medium">{profile.available ? "Шукаю роботу" : "Не шукаю"}</span>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                Скасувати
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Зберегти
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Редагувати</Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Особиста інформація
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Image
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    width={120}
                    height={120}
                    className="rounded-2xl object-cover border-4 border-primary/20"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ім'я</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Прізвище</Label>
                    <Input
                      id="middleName"
                      value={profile.middleName}
                      onChange={(e) => setProfile({ ...profile, middleName: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Дата народження</Label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                        disabled={!isEditing}
                        className="pl-9"
                      />
                    </div>
                    {profile.birthDate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Вік: {calculateAge(profile.birthDate)} років
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Стать</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(value) => setProfile({ ...profile, gender: value as "male" | "female" | "other" })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="gender" className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Чоловік</SelectItem>
                        <SelectItem value="female">Жінка</SelectItem>
                        <SelectItem value="other">Інше</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Контактні дані
              </CardTitle>
              <CardDescription>Як роботодавці можуть з вами зв'язатися</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={profile.telegram}
                    onChange={(e) => setProfile({ ...profile, telegram: e.target.value })}
                    disabled={!isEditing}
                    placeholder="@username"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="viber">Viber</Label>
                  <Input
                    id="viber"
                    value={profile.viber}
                    onChange={(e) => setProfile({ ...profile, viber: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+380..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    disabled={!isEditing}
                    placeholder="linkedin.com/in/..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Портфоліо</Label>
                  <Input
                    id="portfolio"
                    value={profile.portfolio}
                    onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Професійна інформація
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Бажана посада</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Досвід роботи (років)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: Number.parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Місто</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="salary">Бажана зарплата</Label>
                  <Input
                    id="salary"
                    value={profile.salary}
                    onChange={(e) => setProfile({ ...profile, salary: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="relocate"
                  checked={profile.relocate}
                  onCheckedChange={(checked) => setProfile({ ...profile, relocate: checked as boolean })}
                  disabled={!isEditing}
                />
                <Label htmlFor="relocate" className="text-sm">
                  Готовий до переїзду
                </Label>
              </div>

              {/* Employment Type */}
              <div>
                <Label className="mb-3 block">Вид зайнятості</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(employmentTypeLabels) as [EmploymentType, string][]).map(([type, label]) => (
                    <Badge
                      key={type}
                      variant={profile.employmentType.includes(type) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        profile.employmentType.includes(type)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      } ${!isEditing && "pointer-events-none"}`}
                      onClick={() => isEditing && toggleEmploymentType(type)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Work Schedule */}
              <div>
                <Label className="mb-3 block">Графік роботи</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(workScheduleLabels) as [WorkSchedule, string][]).map(([schedule, label]) => (
                    <Badge
                      key={schedule}
                      variant={profile.workSchedule.includes(schedule) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        profile.workSchedule.includes(schedule)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/10"
                      } ${!isEditing && "pointer-events-none"}`}
                      onClick={() => isEditing && toggleWorkSchedule(schedule)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <Label htmlFor="summary">Про себе</Label>
                <Textarea
                  id="summary"
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle>Навички</CardTitle>
              <CardDescription>Технічні та професійні навички</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1 text-sm py-1.5 px-3">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Додати навичку"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Освіта
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUser.education.map((edu, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{edu.institution}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree}, {edu.field}
                      </p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Додати освіту
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                Мови
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentUser.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <span className="font-medium">{lang.language}</span>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                ))}
                {isEditing && (
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Додати мову
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Налаштування видимості</CardTitle>
              <CardDescription>Контролюйте, що бачать роботодавці</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Профіль видимий</p>
                  <p className="text-xs text-muted-foreground">Роботодавці можуть знайти вас</p>
                </div>
                <Switch
                  checked={profile.profileVisible}
                  onCheckedChange={(checked) => setProfile({ ...profile, profileVisible: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Показувати зарплату</p>
                  <p className="text-xs text-muted-foreground">Відображати очікувану зарплату</p>
                </div>
                <Switch
                  checked={profile.showSalary}
                  onCheckedChange={(checked) => setProfile({ ...profile, showSalary: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Показувати контакти</p>
                  <p className="text-xs text-muted-foreground">Дозволити перегляд контактів</p>
                </div>
                <Switch
                  checked={profile.showContacts}
                  onCheckedChange={(checked) => setProfile({ ...profile, showContacts: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* CV Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Моє CV</CardTitle>
              <CardDescription>PDF, DOC або DOCX · до 5 МБ</CardDescription>
            </CardHeader>
            <CardContent>
              <CvUpload value={cvUrl} onChange={setCvUrl} persist />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Переглядів профілю</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Отримано запитів</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Збережено вакансій</span>
                <span className="font-semibold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
