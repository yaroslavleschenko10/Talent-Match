"use client"

import { useState } from "react"
import { mockEmployers } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

const company = mockEmployers[0]

export default function EmployerSettingsPage() {
  const [form, setForm] = useState({
    companyName: company?.companyName ?? "",
    industry: company?.industry ?? "",
    size: company?.size ?? "",
    location: company?.location ?? "",
    website: company?.website ?? "",
    description: company?.description ?? "",
    contactPerson: company?.contactPerson ?? "",
    email: company?.email ?? "",
    phone: company?.phone ?? "",
  })
  const [notifications, setNotifications] = useState({
    newApplications: true,
    chatMessages: true,
    interviewReminders: true,
    weeklyDigest: false,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Налаштування</h1>
          <p className="text-muted-foreground">Профіль компанії та сповіщення</p>
        </div>
        <Button size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          {saved ? "Збережено!" : "Зберегти"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Профіль компанії</CardTitle>
          <CardDescription>Інформація, яку бачать кандидати</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Назва компанії</Label>
            <Input
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Галузь</Label>
            <Input
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Розмір</Label>
            <Input
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Локація</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Сайт</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Опис</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контакти</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Контактна особа</Label>
            <Input
              value={form.contactPerson}
              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Телефон</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сповіщення</CardTitle>
          <CardDescription>Що надсилати на email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              ["newApplications", "Нові відгуки на вакансії"],
              ["chatMessages", "Повідомлення в чатах"],
              ["interviewReminders", "Нагадування про співбесіди"],
              ["weeklyDigest", "Тижневий дайджест"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key} className="cursor-pointer">
                {label}
              </Label>
              <Switch
                id={key}
                checked={notifications[key]}
                onCheckedChange={(v) => setNotifications({ ...notifications, [key]: v })}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
