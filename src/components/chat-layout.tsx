"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { users, messages as allMessages } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Search, SendHorizonal } from "lucide-react"

type User = typeof users[0]
type Messages = typeof allMessages

export function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<User>(users[0])
  const [messages, setMessages] = useState(allMessages[selectedUser.id as keyof Messages])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setMessages(allMessages[user.id as keyof Messages] || [])
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full rounded-lg border">
      <div className="w-1/3 min-w-[300px] border-r">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold tracking-tight">Conversas</h2>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-accent",
                  selectedUser.id === user.id && "bg-accent"
                )}
              >
                <Avatar className="relative h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  {user.online && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{user.lastMessageTime}</p>
                  {user.unread > 0 && (
                    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col w-2/3">
        {selectedUser ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="flex flex-col gap-4">
                {messages.map((msg, index) => (
                  <div key={index} className={cn(
                    "flex items-end gap-2",
                    msg.sender === 'me' ? 'justify-end' : 'justify-start'
                  )}>
                    {msg.sender !== 'me' && <Avatar className="h-8 w-8"><AvatarImage src={selectedUser.avatar} /></Avatar>}
                    <div className={cn(
                      "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                      msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}>{msg.timestamp}</p>
                    </div>
                     {msg.sender === 'me' && <Avatar className="h-8 w-8"><AvatarImage src="https://placehold.co/40x40.png" /></Avatar>}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form className="relative">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  className="pr-20 resize-none"
                />
                <Button type="submit" size="icon" className="absolute top-1/2 right-3 -translate-y-1/2">
                  <SendHorizonal className="h-5 w-5" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Selecione uma conversa para começar a conversar.</p>
          </div>
        )}
      </div>
    </div>
  )
}
