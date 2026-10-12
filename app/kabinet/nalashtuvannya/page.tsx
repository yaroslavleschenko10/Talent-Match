"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Bell,
  Shield,
  Eye,
  Trash2,
  Lock,
  Mail,
  Save,
} from "lucide-react"

export default function NalashtuvannyaPage() {
  const [notifications, setNotifications] = useState({
    emailRequests: true,
    emailMessages: true,
    emailNews: false,
    pushRequests: true,
    pushMessages: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showSalary: true,
    showContacts: true,
    showOnline: true,
  })

  const [language, setLanguage] = useState("uk")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Налаштування</h1>
        <p className="text-muted-foreground">Керуйте своїм обліковим записом та сповіщеннями</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Сповіщення
          </CardTitle>
          <CardDescription>Налаштуйте, як ви хочете отримувати сповіщення</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-4">Email сповіщення</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Нові запити</p>
                  <p className="text-xs text-muted-foreground">
                    Отримувати email при новому запиті від роботодавця
                  </p>
                </div>
                <Switch
                  checked={notifications.emailRequests}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailRequests: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Повідомлення</p>
                  <p className="text-xs text-muted-foreground">
                    Отримувати email при новому повідомленні
                  </p>
                </div>
                <Switch
                  checked={notifications.emailMessages}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailMessages: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Новини та оновлення</p>
                  <p className="text-xs text-muted-foreground">
                    Отримувати інформацію про нові функції платформи
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNews}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailNews: checked })
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium mb-4">Push сповіщення</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Нові запити</p>
                  <p className="text-xs text-muted-foreground">
                    Миттєві сповіщення про нові запити
                  </p>
                </div>
                <Switch
                  checked={notifications.pushRequests}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushRequests: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Повідомлення</p>
                  <p className="text-xs text-muted-foreground">
                    Миттєві сповіщення про нові повідомлення
                  </p>
                </div>
                <Switch
                  checked={notifications.pushMessages}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushMessages: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Приватність
          </CardTitle>
          <CardDescription>Контролюйте видимість вашого профілю</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Профіль видимий</p>
              <p className="text-xs text-muted-foreground">
                Дозволити роботодавцям знаходити ваш профіль
              </p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Показувати зарплату</p>
              <p className="text-xs text-muted-foreground">
                Відображати очікувану зарплату в профілі
              </p>
            </div>
            <Switch
              checked={privacy.showSalary}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showSalary: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Показувати контакти</p>
              <p className="text-xs text-muted-foreground">
                Дозволити перегляд контактної інформації
              </p>
            </div>
            <Switch
              checked={privacy.showContacts}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showContacts: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Статус онлайн</p>
              <p className="text-xs text-muted-foreground">
                Показувати, коли ви онлайн
              </p>
            </div>
            <Switch
              checked={privacy.showOnline}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnline: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Безпека
          </CardTitle>
          <CardDescription>Налаштування безпеки облікового запису</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="current-email">Поточний email</Label>
            <div className="flex gap-3 mt-1.5">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="current-email"
                  value="olena.kovalenko@email.com"
                  disabled
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                Змінити
              </Button>
            </div>
          </div>

          <div>
            <Label>Пароль</Label>
            <div className="flex gap-3 mt-1.5">
              <div className="relative flex-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" value="••••••••••••" disabled className="pl-9" />
              </div>
              <Button variant="outline" className="bg-transparent">
                Змінити
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Останній раз змінено: 15.01.2026</p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="text-sm font-medium">Двофакторна автентифікація</p>
              <p className="text-xs text-muted-foreground">
                Додатковий рівень захисту для вашого акаунту
              </p>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              Налаштувати
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Налаштування</CardTitle>
          <CardDescription>Загальні налаштування інтерфейсу</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language">Мова інтерфейсу</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="mt-1.5 w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uk">Українська</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Небезпечна зона
          </CardTitle>
          <CardDescription>Незворотні дії з вашим обліковим записом</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/30">
            <div>
              <p className="text-sm font-medium">Видалити обліковий запис</p>
              <p className="text-xs text-muted-foreground">
                Це видалить всі ваші дані назавжди
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Видалити
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ця дія є незворотною. Це назавжди видалить ваш обліковий запис та всі
                    пов'язані з ним дані.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Скасувати</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Так, видалити
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Зберегти зміни
        </Button>
      </div>
    </div>
  )
}
