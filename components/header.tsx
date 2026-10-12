"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Building2, ChevronDown, LogOut, LogIn } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, logout, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/50 group-hover:shadow-primary/70 transition-all">
            <span className="text-xl font-bold text-primary-foreground">TM</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            TalentMatch
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/kandydaty" className="text-sm font-medium hover:text-primary transition-colors">
            Кандидати
          </Link>
          <Link
            href={user?.role === "candidate" ? "/kabinet/profil" : "/kabinet/profil"}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Кабінет працівника
          </Link>
          <Link
            href="/employer/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Кабінет роботодавця
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-primary/30 hover:bg-primary/10 bg-transparent gap-2"
                >
                  <User className="h-4 w-4" />
                  {user.email.split("@")[0]}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user.role === "candidate" && (
                  <DropdownMenuItem asChild>
                    <Link href="/kabinet/profil" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Мій кабінет
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === "employer" && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/employer/dashboard"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="h-4 w-4" />
                      Кабінет компанії
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild className="border-primary/30 bg-transparent gap-2">
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Увійти
              </Link>
            </Button>
          )}
          <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
            <Link href="/kandydaty">Знайти таланти</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
