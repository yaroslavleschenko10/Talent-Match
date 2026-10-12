"use client"

import { useState } from "react"
import {
  getBlacklistedCompaniesByCandidateId,
  type BlacklistedCompany,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Ban, Plus, Trash2, Building2, Calendar } from "lucide-react"

const CANDIDATE_ID = "1"

export default function BlacklistPage() {
  const [list, setList] = useState<BlacklistedCompany[]>(
    getBlacklistedCompaniesByCandidateId(CANDIDATE_ID)
  )
  const [open, setOpen] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [reason, setReason] = useState("")

  const handleAdd = () => {
    if (!companyName.trim() || !reason.trim()) return
    const item: BlacklistedCompany = {
      id: `bl${Date.now()}`,
      candidateId: CANDIDATE_ID,
      companyName: companyName.trim(),
      reason: reason.trim(),
      addedAt: new Date().toISOString(),
    }
    setList([item, ...list])
    setCompanyName("")
    setReason("")
    setOpen(false)
  }

  const remove = (id: string) => setList(list.filter((i) => i.id !== id))

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Чорний список</h1>
          <p className="text-muted-foreground">
            Компанії, від яких ви не хочете отримувати запити
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Додати компанію
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Додати до чорного списку</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Назва компанії *</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ТОВ «Приклад»"
                />
              </div>
              <div className="space-y-2">
                <Label>Причина *</Label>
                <Textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Чому ви не хочете співпрацювати з цією компанією..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleAdd} disabled={!companyName.trim() || !reason.trim()}>
                Додати
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {list.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Ban className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Чорний список порожній</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((item) => (
            <Card key={item.id} className="hover:border-destructive/30 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-destructive/15 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{item.companyName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Додано {formatDate(item.addedAt)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => remove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
