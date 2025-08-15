
'use client';

import Link from "next/link"
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { SidebarNav } from "@/components/sidebar-nav"
import { UserProvider, useUser } from '@/context/UserContext';


const AppLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.125 10.5L10.5 7.875L7.875 10.5L10.5 13.125L13.125 10.5Z" />
      <path d="M7 4C5.89543 4 5 4.89543 5 6V7C5 7.55228 5.44772 8 6 8H7C7.55228 8 8 7.55228 8 7V6C8 4.89543 6.90457 4 6 4C4.89543 4 4 4.89543 4 6V15C4 16.1046 4.89543 17 6 17H7C7.55228 17 8 16.5523 8 16V14.5" />
      <path d="M17 4C18.1046 4 19 4.89543 19 6V7C19 7.55228 18.5523 8 18 8H17C16.4477 8 16 7.55228 16 7V6C16 4.89543 17.0954 4 18 4C19.1046 4 20 4.89543 20 6V15C20 16.1046 19.1046 17 18 17H17C16.4477 17 16 16.5523 16 16V14.5" />
    </svg>
  );

const UserProfile = () => {
    const { user } = useUser();
    const nameInitials = user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'P';

    return (
        <div className="flex flex-col gap-2">
             <Button variant="ghost" className="h-14 w-full justify-start p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center" asChild>
                <Link href="/dashboard/profile">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="avatar" />
                        <AvatarFallback>{nameInitials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex flex-col items-start group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">Ver Perfil</span>
                    </div>
                </Link>
            </Button>
            <Button variant="destructive" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-10" asChild>
                 <Link href="/">
                    <LogOut />
                    <span className="group-data-[collapsible=icon]:hidden ml-2">Sair</span>
                </Link>
            </Button>
        </div>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
        <SidebarProvider>
        <div className="flex min-h-screen bg-background">
            <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <AppLogo />
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-lg font-semibold tracking-tight">
                    IntegraGov
                    </span>
                </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
                <UserProfile />
            </SidebarFooter>
            </Sidebar>
            <SidebarInset>
            <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                {/* Future global search or actions */}
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </main>
            </SidebarInset>
        </div>
        </SidebarProvider>
    </UserProvider>
  )
}
