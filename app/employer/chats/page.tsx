"use client"

import { useMemo, useState } from "react"
import {
  getChatsByEmployerId,
  getChatMessages,
  type Chat,
  type ChatMessage,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const EMP_ID = "emp1"

export default function EmployerChatsPage() {
  const chats = useMemo(() => getChatsByEmployerId(EMP_ID), [])
  const [selectedId, setSelectedId] = useState<string | null>(chats[0]?.id ?? null)
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    chats[0] ? getChatMessages(chats[0].id) : []
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
      senderId: EMP_ID,
      senderType: "employer",
      content: text.trim(),
      createdAt: new Date().toISOString(),
      read: true,
    }
    setMessages([...messages, msg])
    setText("")
  }

  const filtered = chats.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.candidate.name.toLowerCase().includes(q) ||
      (c.vacancyTitle ?? "").toLowerCase().includes(q)
    )
  })

  const selected = chats.find((c) => c.id === selectedId)

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
        <p className="text-muted-foreground">Спілкування з кандидатами</p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-240px)] min-h-[480px]">
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
                    "w-full text-left p-3 border-b border-border/50 hover:bg-muted/50 transition-colors",
                    selectedId === chat.id && "bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Image
                      src={chat.candidate.avatar || "/placeholder.svg"}
                      alt={chat.candidate.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm truncate">
                          {chat.candidate.name}
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
                <Image
                  src={selected.candidate.avatar || "/placeholder.svg"}
                  alt={selected.candidate.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{selected.candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{selected.vacancyTitle}</p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const mine = msg.senderType === "employer"
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
