"use client"

import { useMemo, useState } from "react"
import {
  mockChats,
  mockEmployers,
  getChatMessages,
  type Chat,
  type ChatMessage,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Building2, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const CANDIDATE_ID = "1"

export default function ChatsPage() {
  const myChats = useMemo(
    () => mockChats.filter((c) => c.candidateId === CANDIDATE_ID),
    []
  )
  const [selectedId, setSelectedId] = useState<string | null>(myChats[0]?.id ?? null)
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    myChats[0] ? getChatMessages(myChats[0].id) : []
  )
  const [text, setText] = useState("")
  const [search, setSearch] = useState("")

  const selectChat = (chat: Chat) => {
    setSelectedId(chat.id)
    setMessages(getChatMessages(chat.id))
  }

  const send = () => {
    if (!text.trim() || !selectedId) return
    const msg: ChatMessage = {
      id: `msg${Date.now()}`,
      chatId: selectedId,
      senderId: CANDIDATE_ID,
      senderType: "candidate",
      content: text.trim(),
      createdAt: new Date().toISOString(),
      read: true,
    }
    setMessages([...messages, msg])
    setText("")
  }

  const employerName = (employerId: string) =>
    mockEmployers.find((e) => e.id === employerId)?.companyName ?? "Компанія"

  const filtered = myChats.filter((c) => {
    const name = employerName(c.employerId).toLowerCase()
    const title = (c.vacancyTitle ?? "").toLowerCase()
    const q = search.toLowerCase()
    return name.includes(q) || title.includes(q)
  })

  const selected = myChats.find((c) => c.id === selectedId)

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString("uk-UA", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Чати</h1>
        <p className="text-muted-foreground">Спілкування з роботодавцями</p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[480px]">
        <Card className="flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Пошук..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                Чатів немає
              </div>
            ) : (
              filtered.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => selectChat(chat)}
                  className={cn(
                    "w-full text-left p-4 border-b border-border/50 hover:bg-muted/50 transition-colors",
                    selectedId === chat.id && "bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm truncate">
                          {employerName(chat.employerId)}
                        </span>
                        {chat.unreadCount > 0 && (
                          <Badge className="h-5 min-w-5 px-1.5 text-xs">{chat.unreadCount}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-primary truncate">{chat.vacancyTitle}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {chat.lastMessage?.content}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          {!selected ? (
            <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
              Оберіть чат
            </CardContent>
          ) : (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{employerName(selected.employerId)}</p>
                  <p className="text-xs text-muted-foreground">{selected.vacancyTitle}</p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const mine = msg.senderType === "candidate"
                    return (
                      <div
                        key={msg.id}
                        className={cn("flex", mine ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                            mine
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted rounded-bl-md"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={cn(
                              "text-[10px] mt-1",
                              mine ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-border flex gap-2">
                <Input
                  placeholder="Написати повідомлення..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())
                  }
                />
                <Button size="icon" onClick={send} disabled={!text.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
