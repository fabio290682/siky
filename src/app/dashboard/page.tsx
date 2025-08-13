

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
import { ArrowUpRight, BookCopy, FileText, Users, HandCoins, PiggyBank, PieChart, BarChart2 } from "lucide-react"
import { getEmendas, type Emenda } from "@/services/transparencia-api"
import { getDeputados } from "@/services/camara-api"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Cell,
  Legend,
} from "recharts"

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
};

const parseCurrency = (value: string) => {
    if (!value || typeof value !== "string") return 0;
    return parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
};


export default async function DashboardPage() {
    const currentYear = new Date().getFullYear();
    const [emendasData, deputadosData] = await Promise.all([
        getEmendas(currentYear, 1),
        getDeputados()
    ]);
    
    const recentAmendments = emendasData.slice(0, 5);
    const totalAmendments = emendasData.length;
    const totalUsers = deputadosData.dados.length;

    // --- Chart Data Processing ---

    // 1. Emendas por Função
    const emendasPorFuncao = emendasData.reduce((acc, emenda) => {
        const funcao = emenda.funcao || 'Não informada';
        if (!acc[funcao]) {
            acc[funcao] = { name: funcao, value: 0 };
        }
        acc[funcao].value += parseCurrency(emenda.valorEmpenhado);
        return acc;
    }, {} as Record<string, {name: string, value: number}>);

    const chartDataFuncao = Object.values(emendasPorFuncao).sort((a,b) => b.value - a.value).slice(0, 10);
    
    // 2. Valores por Status
    const totalValores = emendasData.reduce((acc, emenda) => {
        acc.pago += parseCurrency(emenda.valorPago);
        acc.liquidado += parseCurrency(emenda.valorLiquidado);
        acc.empenhado += parseCurrency(emenda.valorEmpenhado);
        return acc;
    }, { pago: 0, liquidado: 0, empenhado: 0 });

    const chartDataValores = [
        { name: 'Pago', value: totalValores.pago },
        { name: 'Liquidado', value: totalValores.liquidado },
        { name: 'Empenhado', value: totalValores.empenhado },
    ];
    const COLORS = ['#16a34a', '#f97316', '#3b82f6'];


  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convênios</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Nenhum convênio carregado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emendas ({currentYear})</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmendments}</div>
            <p className="text-xs text-muted-foreground">
              Total de emendas encontradas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parlamentares</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Deputados federais em exercício
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart2/> Top 10 Funções por Valor Empenhado</CardTitle>
                  <CardDescription>Distribuição dos valores de emendas por função.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartDataFuncao} layout="vertical" margin={{ left: 20 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} />
                          <Tooltip 
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            formatter={(value: number) => formatCurrency(value)}
                          />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><PieChart/> Valores por Status</CardTitle>
                  <CardDescription>Visão geral da execução financeira das emendas.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                          <Pie
                              data={chartDataValores}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                              {chartDataValores.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                           <Legend />
                      </PieChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Emendas Recentes ({currentYear})</CardTitle>
            <CardDescription>
              As últimas emendas parlamentares adicionadas para o ano de {currentYear}.
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
                <TableHead>Número</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Valor Empenhado</TableHead>
                <TableHead>Valor Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAmendments.length > 0 ? recentAmendments.map((amendment) => (
                <TableRow key={amendment.codigoEmenda}>
                  <TableCell className="font-medium">{amendment.numeroEmenda}</TableCell>
                  <TableCell>{amendment.autor}</TableCell>
                  <TableCell>{amendment.funcao}</TableCell>
                  <TableCell>{amendment.valorEmpenhado}</TableCell>
                  <TableCell>{amendment.valorPago}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhuma emenda encontrada para o ano de {currentYear}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
