
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
  Users,
  Network,
  ExternalLink,
  FileBarChart,
  Menu,
  CircleUser,
  Search,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"


const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  { href: "/dashboard/conventions", label: "Convênios", icon: BookCopy },
  { href: "/dashboard/amendments", label: "Emendas", icon: FileText },
  { href: "/dashboard/parliamentarians", label: "Parlamentares", icon: Users },
  { href: "/dashboard/senators", label: "Senadores", icon: Users },
  { href: "/dashboard/parties", label: "Partidos", icon: Network },
  { 
    href: "https://investsuspaineis.saude.gov.br/extensions/CGIN_Painel_FAF/CGIN_Painel_FAF.html", 
    label: "Repasses", 
    icon: ExternalLink,
    external: true 
  },
  { 
    href: "https://investsuspaineis.saude.gov.br/extensions/CGIN_Painel_SISMOB/CGIN_Painel_SISMOB.html#GUIA01", 
    label: "SISMOB", 
    icon: ExternalLink,
    external: true 
  },
  { href: "/dashboard/siop", label: "SIOP", icon: SlidersHorizontal },
  { href: "/dashboard/managerial-report", label: "Relatório Gerencial", icon: FileBarChart },
  { href: "/dashboard/status", label: "Status", icon: HeartPulse },
  { href: "/dashboard/integrations", label: "Integrações", icon: Network },
]

const NavLink = ({ href, label, isActive, external = false }: { href: string, label: string, isActive: boolean, external?: boolean }) => {
    const linkProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
    return (
        <Link 
            {...linkProps}
            className={cn(
                "text-white transition-colors hover:text-yellow-300",
                isActive ? "font-bold text-yellow-300" : "text-white"
            )}
        >
            {label}
        </Link>
    );
};


export function Header({user}: {user: {name: string, email: string}}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] px-4 md:px-6 shadow-md z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-white"
          >
            <span className="font-bold">Brasil</span>
          </Link>
           {menuItems.map((item) => (
             <NavLink 
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={!item.external && pathname === item.href}
                external={item.external}
             />
           ))}
        </nav>
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-transparent border-0 text-white hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                 <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Brasil
                  </Link>
                  {menuItems.map((item) => (
                    <NavLink 
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        isActive={!item.external && pathname === item.href}
                        external={item.external}
                    />
                  ))}
              </nav>
            </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings">Configurações</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Sair</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    </header>
  )
}
