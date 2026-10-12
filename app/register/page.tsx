"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiError } from "@/lib/api"

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<"candidate" | "employer">("candidate")
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    position: "",
    location: "Київ",
    companyName: "",
    contactPerson: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await register({
        email: form.email,
        password: form.password,
        role,
        firstName: form.firstName,
        lastName: form.lastName,
        position: form.position,
        location: form.location,
        companyName: form.companyName,
        contactPerson: form.contactPerson || form.firstName,
      })
      if (role === "employer") router.push("/employer/dashboard")
      else router.push("/kabinet/profil")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Помилка реєстрації")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Реєстрація</CardTitle>
          <CardDescription>Створіть акаунт на TalentMatch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={role === "candidate" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setRole("candidate")}
            >
              Кандидат
            </Button>
            <Button
              type="button"
              variant={role === "employer" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setRole("employer")}
            >
              Роботодавець
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Пароль (мін. 6 символів)</Label>
              <Input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {role === "candidate" ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Ім&apos;я</Label>
                    <Input
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Прізвище</Label>
                    <Input
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Посада</Label>
                  <Input
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    placeholder="Frontend Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Місто</Label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Назва компанії</Label>
                  <Input
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Контактна особа</Label>
                  <Input
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  />
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Реєстрація..." : "Зареєструватися"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Вже є акаунт?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Увійти
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
