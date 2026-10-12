"use client"

import { useMemo } from "react"
import { mockStorageMaterials } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FolderOpen,
  FileText,
  Image as ImageIcon,
  Video,
  Link2,
  ExternalLink,
} from "lucide-react"

const EMP_ID = "emp1"

const typeIcons = {
  document: FileText,
  image: ImageIcon,
  video: Video,
  link: Link2,
  test: FileText,
}

const categoryLabels: Record<string, string> = {
  job_description: "Опис вакансії",
  company_info: "Про компанію",
  test_task: "Тестове",
  presentation: "Презентація",
  other: "Інше",
}

export default function EmployerMaterialsPage() {
  const materials = useMemo(
    () => mockStorageMaterials.filter((m) => m.employerId === EMP_ID),
    []
  )

  const formatSize = (bytes?: number) => {
    if (!bytes) return ""
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Матеріали</h1>
          <p className="text-muted-foreground">Документи та файли для кандидатів</p>
        </div>
        <Button size="sm">
          <FolderOpen className="h-4 w-4 mr-2" />
          Завантажити
        </Button>
      </div>

      {materials.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Матеріалів немає</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {materials.map((mat) => {
            const Icon = typeIcons[mat.type] ?? FileText
            return (
              <Card key={mat.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-1">{mat.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                        {mat.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[mat.category] ?? mat.category}
                        </Badge>
                        {mat.fileSize && (
                          <span className="text-xs text-muted-foreground">
                            {formatSize(mat.fileSize)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={mat.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
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
