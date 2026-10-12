"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitBranch,
  MessageSquare,
  Calendar,
  BarChart3,
  FileCheck,
  FolderOpen,
  Settings,
  Building2,
} from "lucide-react"
import { mockEmployers } from "@/lib/mock-data"

const sidebarItems = [
  { href: "/employer/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/employer/vacancies", label: "Вакансії", icon: Briefcase },
  { href: "/employer/candidates", label: "Кандидати", icon: Users },
  { href: "/employer/pipeline", label: "Воронка", icon: GitBranch },
  { href: "/employer/chats", label: "Чати", icon: MessageSquare },
  { href: "/employer/calendar", label: "Календар", icon: Calendar },
  { href: "/employer/analytics", label: "Аналітика", icon: BarChart3 },
  { href: "/employer/tests", label: "Тести", icon: FileCheck },
  { href: "/employer/materials", label: "Матеріали", icon: FolderOpen },
  { href: "/employer/settings", label: "Налаштування", icon: Settings },
]

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const company = mockEmployers[0]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{company?.companyName}</p>
                    <p className="text-xs text-muted-foreground truncate">{company?.industry}</p>
                  </div>
                </div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
                  Кабінет роботодавця
                </h2>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/employer/dashboard" && pathname.startsWith(item.href))
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
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
