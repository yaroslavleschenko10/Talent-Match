"use client"

import { useMemo } from "react"
import { getTestsByEmployerId, mockCandidateTests } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileCheck, Clock, Target, ExternalLink, Users } from "lucide-react"

const EMP_ID = "emp1"

const typeLabels: Record<string, string> = {
  technical: "Технічний",
  soft_skills: "Soft skills",
  language: "Мова",
  logic: "Логіка",
}

export default function EmployerTestsPage() {
  const tests = useMemo(() => getTestsByEmployerId(EMP_ID), [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Тести</h1>
          <p className="text-muted-foreground">Тестові завдання для кандидатів</p>
        </div>
        <Button size="sm">
          <FileCheck className="h-4 w-4 mr-2" />
          Створити тест
        </Button>
      </div>

      {tests.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Тестів немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tests.map((test) => {
            const assigned = mockCandidateTests.filter((ct) => ct.testId === test.id)
            const completed = assigned.filter((ct) => ct.status === "completed")
            const avgScore =
              completed.length > 0
                ? Math.round(
                    completed.reduce((s, ct) => s + (ct.score ?? 0), 0) / completed.length
                  )
                : null

            return (
              <Card key={test.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <Badge variant="outline">{typeLabels[test.type] ?? test.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{test.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {test.duration} хв
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileCheck className="h-4 w-4" />
                          {test.questionsCount} питань
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Target className="h-4 w-4" />
                          Прохідний: {test.passingScore}%
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          Призначено: {assigned.length}
                          {avgScore !== null && ` · середній бал ${avgScore}%`}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={test.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Відкрити
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
