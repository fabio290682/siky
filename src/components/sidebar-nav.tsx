"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookCopy,
  FileText,
  HeartPulse,
  LayoutGrid,
  MessageSquare,
  SlidersHorizontal,
  Briefcase,
  Building2,
  FileBarChart,
  Star,
  Users
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  { href: "/dashboard/conventions", label: "Convênios", icon: BookCopy },
  { href: "/dashboard/amendments", label: "Emendas", icon: FileText },
  { href: "/dashboard/special-amendments", label: "Emendas Especiais", icon: Star },
  { href: "/dashboard/investsus", label: "InvestSUS", icon: Briefcase },
  { href: "/dashboard/sismob", label: "SISMOB", icon: Building2 },
  { href: "/dashboard/siop", label: "SIOP", icon: SlidersHorizontal },
  { href: "/dashboard/managerial-report", label: "Relatório Gerencial", icon: FileBarChart },
  { href: "/dashboard/status", label: "Status", icon: HeartPulse },
  { href: "/dashboard/integrations", label: "Integrações", icon: Users },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
