
"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, BookCopy, FileText, Users } from "lucide-react"
import { conventions, amendments, users } from "@/lib/data"

const getAmendmentStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'aprovada':
      return 'default';
    case 'em análise':
      return 'secondary';
    case 'pendente':
      return 'outline';
    case 'rejeitada':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getConventionStatus = (situacao: string) => {
    return situacao.toLowerCase() === 'adimplente' || situacao.toLowerCase() === 'em execução';
}

export default function DashboardPage() {
  const totalConventions = conventions.length;
  const activeConventions = conventions.filter(c => getConventionStatus(c.situacao)).length;
  const totalAmendments = amendments.length;
  const approvedAmendments = amendments.filter(a => a.status && a.status.toLowerCase() === 'aprovada').length;
  const totalUsers = users.length;

  const recentAmendments = [...amendments].slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convênios</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConventions}</div>
            <p className="text-xs text-muted-foreground">
              {activeConventions} ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emendas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmendments}</div>
            <p className="text-xs text-muted-foreground">
              {approvedAmendments} aprovadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Usuários registrados no sistema
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Emendas Recentes</CardTitle>
            <CardDescription>
              As últimas emendas parlamentares adicionadas.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/amendments">
              Ver Todas
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emenda</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAmendments.map((amendment) => (
                <TableRow key={amendment.id}>
                  <TableCell className="font-medium">{amendment.id}</TableCell>
                  <TableCell>{amendment.autor}</TableCell>
                  <TableCell>{amendment.funcao}</TableCell>
                  <TableCell>{amendment.valor}</TableCell>
                  <TableCell>
                    <Badge variant={getAmendmentStatusVariant(amendment.status)}>
                      {amendment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
