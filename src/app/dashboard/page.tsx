"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  ArrowRightLeft,
  DollarSign,
  Ticket,
  Percent,
  TrendingUp,
  TrendingDown,
  Circle,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const statCards = [
  { title: "Transações", value: "500", icon: ArrowRightLeft },
  { title: "Saldo da Conta", value: "R$ 3.098.675", icon: DollarSign },
  { title: "Ticket Médio", value: "R$ 3,10 Mi", icon: Ticket },
  { title: "Margem Lucro", value: "40,16%", icon: Percent },
]

const debitCreditData = [
    { name: "JAN", "Valor Credito": 199970, "Valor Debito": 180000 },
    { name: "FEV", "Valor Credito": 210000, "Valor Debito": 190000 },
    { name: "MAR", "Valor Credito": 267090, "Valor Debito": 230000 },
    { name: "ABR", "Valor Credito": 167700, "Valor Debito": 150000 },
    { name: "MAI", "Valor Credito": 321170, "Valor Debito": 290000 },
    { name: "JUN", "Valor Credito": 213600, "Valor Debito": 195000 },
    { name: "JUL", "Valor Credito": 195600, "Valor Debito": 175000 },
    { name: "AGO", "Valor Credito": 180850, "Valor Debito": 160000 },
    { name: "SET", "Valor Credito": 239530, "Valor Debito": 210000 },
    { name: "OUT", "Valor Credito": 220000, "Valor Debito": 200000 },
    { name: "NOV", "Valor Credito": 199770, "Valor Debito": 180000 },
    { name: "DEZ", "Valor Credito": 250000, "Valor Debito": 220000 },
];

const cashFlowData = [
  { name: "Fluxo de Caixa", value: 7720000, color: "hsl(var(--primary))", label: "Entrada" },
  { name: "Fluxo de Caixa", value: 4620000, color: "hsl(var(--muted))", label: "Saída" },
];

const costCenterData = [
  { name: 'Vendas', "Total Transacoes Crédito": 72, "Total Transacoes Debito": 60 },
  { name: 'TI', "Total Transacoes Crédito": 67, "Total Transacoes Debito": 68 },
  { name: 'RH', "Total Transacoes Crédito": 64, "Total Transacoes Debito": 63 },
  { name: 'Marketing', "Total Transacoes Crédito": 56, "Total Transacoes Debito": 50 },
];

const categoryData = [
    { name: "Salário", value: 1400143.56 },
    { name: "Despesa Fixa", value: 1349541.46 },
    { name: "Investimentos", value: 1220802.06 },
    { name: "Lazer", value: 1121350.52 },
];

const clientTransactionsData = [
    { name: 'Cliente A', value: 113 },
    { name: 'Cliente B', value: 114 },
    { name: 'Cliente C', value: 89 },
    { name: 'Cliente D', value: 94 },
    { name: 'Cliente E', value: 90 },
];

const profitabilityData = [
    { account: 'Conta Corrente', profit: '42,61%', profitability: 'R$ 1.261.361,67' },
    { account: 'Investimentos', profit: '31,88%', profitability: 'R$ 672.213,91' },
    { account: 'Poupança', profit: '44,01%', profitability: 'R$ 1.165.099,38' },
    { account: 'Total', profit: '40,16%', profitability: 'R$ 3.098.674,96' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-lg">
          <p className="font-bold text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  

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
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
            <CardHeader>
                <CardTitle>Débito e Crédito</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={debitCreditData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `R$ ${value/1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="circle" iconSize={8} />
                        <Bar dataKey="Valor Credito" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Valor Debito" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Fluxo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={cashFlowData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} innerRadius={60} startAngle={90} endAngle={450}>
                            {cashFlowData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={(value: number, name: string) => [`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value / 1000000)} Mi`, name]} />
                        <Legend iconType="circle" iconSize={8} verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-5">
            <CardHeader>
                <CardTitle>Centro de Custo</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={costCenterData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0, }}
                >
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" iconSize={8} />
                    <Area type="monotone" dataKey="Total Transacoes Crédito" stackId="1" stroke="hsl(var(--primary))" fill="hsla(var(--primary), 0.2)" />
                    <Area type="monotone" dataKey="Total Transacoes Debito" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsla(var(--muted-foreground), 0.2)" />
                </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {categoryData.map(item => (
                        <div key={item.name} className="flex flex-col">
                            <div className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(item.value / 1500000) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Transações por Cliente</CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clientTransactionsData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card className="lg:col-span-12">
            <CardHeader>
                <CardTitle>Rentabilidade</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Nome_Conta</TableHead>
                        <TableHead>Lucro (%)</TableHead>
                        <TableHead>Rentabilidade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {profitabilityData.map((item, index) => (
                        <TableRow key={index} className={item.account === 'Total' ? 'font-bold bg-muted/50' : ''}>
                            <TableCell>{item.account}</TableCell>
                            <TableCell>{item.profit}</TableCell>
                            <TableCell>{item.profitability}</TableCell>
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
