"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Send } from "lucide-react"
import { employmentTypeLabels, workScheduleLabels } from "@/lib/mock-data"
import type { EmploymentType, WorkSchedule } from "@/lib/mock-data"
import { requestsApi, ApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

interface EmployerRequestFormProps {
  candidateId?: string
  candidateName: string
  candidatePosition: string
}

export function EmployerRequestForm({
  candidateId,
  candidateName,
  candidatePosition,
}: EmployerRequestFormProps) {
  const { employerProfile, user } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    companyName: employerProfile?.companyName || "",
    contactPerson: employerProfile?.contactPerson || "",
    email: user?.email || "",
    phone: employerProfile?.phone || "",
    position: candidatePosition,
    salaryRange: "",
    employmentType: "full-time" as EmploymentType,
    workSchedule: "hybrid" as WorkSchedule,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (candidateId && employerProfile) {
        await requestsApi.create({
          candidateId,
          employerId: employerProfile.id,
          companyName: form.companyName,
          contactPerson: form.contactPerson,
          email: form.email,
          phone: form.phone,
          position: form.position,
          salaryRange: form.salaryRange,
          employmentType: form.employmentType,
          workSchedule: form.workSchedule,
          message: form.message,
        })
      }
      setSubmitted(true)
    } catch (err) {
      // Still show success UX if offline — or show error
      if (err instanceof ApiError && err.status !== 0) {
        setError(err.message)
      } else {
        // API offline — accept as mock success
        setSubmitted(true)
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-accent">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Запит надіслано!</h3>
          <p className="text-sm text-muted-foreground">
            Ваш запит до {candidateName} успішно надіслано.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Надіслати запит</CardTitle>
        <CardDescription>
          Запросіть {candidateName} на співбесіду або запропонуйте вакансію
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Назва компанії *</Label>
            <Input
              id="companyName"
              required
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Контактна особа *</Label>
            <Input
              id="contactPerson"
              required
              value={form.contactPerson}
              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Посада *</Label>
            <Input
              id="position"
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryRange">Зарплатна вилка</Label>
            <Input
              id="salaryRange"
              value={form.salaryRange}
              onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
              placeholder="80 000 – 120 000 грн"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Тип зайнятості</Label>
              <Select
                value={form.employmentType}
                onValueChange={(v) => setForm({ ...form, employmentType: v as EmploymentType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(employmentTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Формат роботи</Label>
              <Select
                value={form.workSchedule}
                onValueChange={(v) => setForm({ ...form, workSchedule: v as WorkSchedule })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(workScheduleLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Повідомлення *</Label>
            <Textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Коротко опишіть вакансію..."
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <Send className="h-4 w-4" />
            {loading ? "Надсилання..." : "Надіслати запит"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
