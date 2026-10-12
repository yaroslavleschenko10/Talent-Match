import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"

export function ComingSoon({ title }: { title: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
          <Construction className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground max-w-sm">
          Цей розділ ще в розробці. Незабаром тут з&apos;явиться повний функціонал.
        </p>
      </CardContent>
    </Card>
  )
}
