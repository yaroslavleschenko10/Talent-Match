import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Target, Zap, ArrowRight, Award, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Glossy Effect */}
      <section className="relative overflow-hidden">
        {/* Glossy gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.2),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Революція у підборі персоналу</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground via-primary-foreground to-accent bg-clip-text text-transparent leading-tight">
              Не чекайте на відгук.
              <br />
              Обирайте таланти самі.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto leading-relaxed">
              Перша платформа, де роботодавці активно шукають кандидатів, а не навпаки. Знайдіть ідеального
              співробітника за лічені хвилини.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50 group"
                asChild
              >
                <Link href="/kandydaty">
                  Переглянути кандидатів
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 backdrop-blur-sm bg-transparent"
                asChild
              >
                <Link href="/stvoryty-rezyume">Створити резюме</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Кандидатів</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Успішність</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24г</div>
                <div className="text-sm text-muted-foreground">Швидкість</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Чому обирають TalentMatch?</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Ми перевернули традиційний підхід до найму. Тепер ви контролюєте процес.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all">
                <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Точний пошук</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Розширені фільтри за навичками, досвідом та локацією допоможуть знайти ідеального кандидата
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all">
                <div className="h-14 w-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Миттєвий контакт</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Надсилайте запити на співбесіду напряму кандидатам без зайвих посередників
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all">
                <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Перевірені профілі</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Всі резюме проходять модерацію для гарантії якості та достовірності інформації
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-6">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Приєднуйтесь сьогодні</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Готові знайти ідеального кандидата?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Почніть прямо зараз та оцініть переваги нового підходу до найму персоналу
            </p>

            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/50"
              asChild
            >
              <Link href="/kandydaty">Почати пошук</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
