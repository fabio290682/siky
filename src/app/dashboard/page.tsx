"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const statCards = [
  { title: "Usuários Ativos", value: "124", icon: Users, change: "+12.5%" },
  { title: "Convênios Abertos", value: "32", icon: Briefcase, change: "+5" },
  { title: "Novas Mensagens", value: "8", icon: MessageSquare, change: "-2.1%" },
  { title: "Emendas Pendentes", value: "15", icon: FileText, change: "+3" },
]

const recentActivities = [
  { user: "Carlos", action: "Atualizou o convênio", target: "CVN002", time: "5m atrás" },
  { user: "Alice", action: "Enviou uma nova mensagem", target: "para Daniel", time: "15m atrás" },
  { user: "Beatriz", action: "Submeteu a emenda", target: "EMD005", time: "1h atrás" },
  { user: "Sistema", action: "Registrou nova licitação", target: "LIC-2024-08", time: "2h atrás" },
]

const chartData = [
    { name: "Jan", value: 65 },
    { name: "Fev", value: 59 },
    { name: "Mar", value: 80 },
    { name: "Abr", value: 81 },
    { name: "Mai", value: 56 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 40 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change} desde o último mês</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral de Atividades</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>
                      {activity.action}{' '}
                      <span className="font-semibold text-primary">{activity.target}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
