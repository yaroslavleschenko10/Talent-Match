"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Inbox, Bookmark, Settings, FileText, MessageSquare, Calendar, Building2, Ban, Calculator, FolderKanban, FileCheck } from "lucide-react"

const sidebarItems = [
  { href: "/kabinet/profil", label: "Профіль", icon: User },
  { href: "/kabinet/rezyume", label: "Редактор резюме", icon: FileText },
  { href: "/kabinet/proekty", label: "Мої проєкти", icon: FolderKanban },
  { href: "/kabinet/chats", label: "Чати", icon: MessageSquare },
  { href: "/kabinet/calendar", label: "Календар", icon: Calendar },
  { href: "/kabinet/testovi", label: "Тестові завдання", icon: FileCheck },
  { href: "/kabinet/kompanii", label: "Мої заявки", icon: Building2 },
  { href: "/kabinet/vidhuky", label: "Мої відгуки", icon: Inbox },
  { href: "/kabinet/zberehene", label: "Збережене", icon: Bookmark },
  { href: "/kabinet/statistika", label: "Статистика", icon: Calculator },
  { href: "/kabinet/blacklist", label: "Чорний список", icon: Ban },
  { href: "/kabinet/nalashtuvannya", label: "Налаштування", icon: Settings },
]

export default function KabinetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 px-2">Кабінет працівника</h2>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
