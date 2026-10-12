"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { candidatesApi, fileUrl, ApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { FileText, Upload, Trash2, ExternalLink, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type CvUploadProps = {
  value?: string | null
  onChange?: (url: string | null) => void
  className?: string
  /** If true, requires login and calls API. If false, only local preview name. */
  persist?: boolean
}

export function CvUpload({ value, onChange, className, persist = true }: CvUploadProps) {
  const { user, token, refreshProfiles } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [localName, setLocalName] = useState<string | null>(null)
  const [error, setError] = useState("")

  const displayUrl = fileUrl(value)
  const hasFile = Boolean(value || localName)

  const onPick = () => inputRef.current?.click()

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    setError("")
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowed.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setError("Дозволені лише PDF, DOC або DOCX")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Максимальний розмір файлу — 5 МБ")
      return
    }

    setLocalName(file.name)

    if (!persist || !token || user?.role !== "candidate") {
      // Local-only (not logged in as candidate)
      onChange?.(file.name)
      return
    }

    setUploading(true)
    try {
      const res = await candidatesApi.uploadCv(file)
      onChange?.(res.cvFileUrl)
      await refreshProfiles()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Не вдалося завантажити файл")
      setLocalName(null)
    } finally {
      setUploading(false)
    }
  }

  const remove = () => {
    setLocalName(null)
    onChange?.(null)
    setError("")
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={onFile}
      />

      {!hasFile ? (
        <button
          type="button"
          onClick={onPick}
          disabled={uploading}
          className="w-full border border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-muted/30 transition-colors text-left"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">
            {uploading ? "Завантаження..." : "Завантажити резюме"}
          </span>
          <span className="text-xs text-muted-foreground">PDF, DOC або DOCX · до 5 МБ</span>
        </button>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
          <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {localName || value?.split("/").pop() || "Резюме"}
            </p>
            <p className="text-xs text-muted-foreground">Файл резюме</p>
          </div>
          <div className="flex gap-1 shrink-0">
            {displayUrl && (
              <Button type="button" variant="ghost" size="icon" asChild>
                <a href={displayUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button type="button" variant="ghost" size="icon" onClick={onPick} disabled={uploading}>
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={remove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      {persist && user?.role !== "candidate" && !token && (
        <p className="text-xs text-muted-foreground">
          Увійдіть як кандидат, щоб зберегти файл на сервері
        </p>
      )}
    </div>
  )
}
