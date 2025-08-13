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
  Building,
  Building2,
  FileBarChart,
  Users,
  Network,
  ExternalLink
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
  { href: "/dashboard/parliamentarians", label: "Parlamentares", icon: Users },
  { href: "/dashboard/senators", label: "Senadores", icon: Users },
  { href: "/dashboard/parties", label: "Partidos", icon: Building },
  { 
    href: "https://investsuspaineis.saude.gov.br/extensions/CGIN_Painel_FAF/CGIN_Painel_FAF.html", 
    label: "Repasses", 
    icon: ExternalLink,
    external: true 
  },
  { href: "/dashboard/siop", label: "SIOP", icon: SlidersHorizontal },
  { href: "/dashboard/managerial-report", label: "Relatório Gerencial", icon: FileBarChart },
  { href: "/dashboard/status", label: "Status", icon: HeartPulse },
  { href: "/dashboard/integrations", label: "Integrações", icon: Network },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={!item.external && pathname.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard")}
            tooltip={item.label}
          >
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <item.icon />
                <span>{item.label}</span>
              </a>
            ) : (
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
