import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, DollarSign } from "lucide-react"
import type { Candidate } from "@/lib/mock-data"
import Image from "next/image"

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={candidate.avatar || "/placeholder.svg"}
            alt={candidate.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-balance">{candidate.name}</h3>
                <p className="text-primary font-medium">{candidate.position}</p>
              </div>
              {candidate.available ? (
                <Badge className="bg-accent text-accent-foreground shrink-0">Доступний</Badge>
              ) : (
                <Badge variant="secondary" className="shrink-0">
                  Зайнятий
                </Badge>
              )}
            </div>

            <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>
                  {candidate.experience}{" "}
                  {candidate.experience === 1 ? "рік" : candidate.experience < 5 ? "роки" : "років"} досвіду
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>{candidate.salary}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {candidate.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 4}
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{candidate.summary}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button asChild className="w-full">
          <Link href={`/kandydaty/${candidate.id}`}>Переглянути резюме та надіслати запит</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
