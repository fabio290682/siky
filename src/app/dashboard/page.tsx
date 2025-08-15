
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
import { ArrowUpRight, DollarSign, Users, Landmark, FileText, TrendingUp, CircleDot, BarChartHorizontal, Loader2 } from "lucide-react"
import { getEmendas, type Emenda } from "@/services/transparencia-api"
import { getDeputados } from "@/services/camara-api"
import * as React from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts"

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
};

const formatCurrencyShort = (value: number) => {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' bi';
    }
    if (value >= 1_000_000) {
        return (value / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' mi';
    }
    if (value >= 1_000) {
        return (value / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' mil';
    }
    return value.toLocaleString('pt-BR');
};


const parseCurrency = (value: string) => {
    if (!value || typeof value !== "string") return 0;
    return parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
};


export default function DashboardPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [kpiData, setKpiData] = React.useState<any>(null);
    const [chartData, setChartData] = React.useState<any>(null);
    const currentYear = new Date().getFullYear();

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const [emendasData, deputadosData] = await Promise.all([
                getEmendas(currentYear, 1),
                getDeputados()
            ]);

            const totalUsers = deputadosData?.dados?.length ?? 0;

            const totalValores = emendasData.reduce((acc, emenda) => {
                acc.pago += parseCurrency(emenda.valorPago);
                acc.empenhado += parseCurrency(emenda.valorEmpenhado);
                return acc;
            }, { pago: 0, empenhado: 0 });

            const valorALiberar = totalValores.empenhado - totalValores.pago;

            setKpiData({
                totalEmpenhado: totalValores.empenhado,
                totalPago: totalValores.pago,
                valorALiberar,
                totalUsers,
                recentAmendments: emendasData.slice(0, 5)
            });


            // Chart data processing
            const emendasPorFuncao = emendasData.reduce((acc, emenda) => {
                const funcao = emenda.funcao || 'Não informada';
                if (!acc[funcao]) {
                    acc[funcao] = { name: funcao, value: 0 };
                }
                acc[funcao].value += parseCurrency(emenda.valorEmpenhado);
                return acc;
            }, {} as Record<string, {name: string, value: number}>);

            const chartDataFuncao = Object.values(emendasPorFuncao).sort((a,b) => b.value - a.value).slice(0, 10);

            const monthlyData = Array.from({ length: 12 }, (_, i) => ({
              name: new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', ''),
              Empenhado: 0,
              Pago: 0,
            }));

            emendasData.forEach((emenda, index) => {
                // This is a mock distribution, replace with actual date parsing if available
                const monthIndex = Math.floor(Math.random() * 12);
                monthlyData[monthIndex].Empenhado += parseCurrency(emenda.valorEmpenhado);
                monthlyData[monthIndex].Pago += parseCurrency(emenda.valorPago);
            });

            setChartData({
                funcao: chartDataFuncao,
                monthly: monthlyData,
                pie: [
                    { name: 'Valor Pago', value: totalValores.pago },
                    { name: 'A Pagar', value: valorALiberar > 0 ? valorALiberar : 0 }
                ]
            });

            setIsLoading(false);
        };

        fetchData();
    }, [currentYear]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }
    
    if (!kpiData || !chartData) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-xl text-muted-foreground">Não foi possível carregar os dados do dashboard.</p>
                <p className="text-sm text-muted-foreground">Verifique a configuração da chave de API do Portal da Transparência.</p>
            </div>
        )
    }

    const PIE_COLORS = ['#16a34a', '#3b82f6'];

  return (
    <div className="flex flex-col gap-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Empenhado ({currentYear})</CardTitle>
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.totalEmpenhado)}</div>
                    <p className="text-xs text-muted-foreground">Valor total comprometido para o ano</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pago ({currentYear})</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.totalPago)}</div>
                    <p className="text-xs text-muted-foreground">Valor efetivamente transferido</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo a Liberar</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.valorALiberar)}</div>
                    <p className="text-xs text-muted-foreground">Restante do valor empenhado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Parlamentares Ativos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpiData.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">Deputados federais em exercício</p>
                </CardContent>
            </Card>
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChartHorizontal/> Execução Mensal (Empenhado vs. Pago)</CardTitle>
                    <CardDescription>Comparativo de valores ao longo de {currentYear}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData.monthly}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrencyShort(Number(value))} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                formatter={(value: number) => formatCurrency(value)}
                            />
                            <Legend iconType="circle" />
                            <Bar dataKey="Empenhado" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Pago" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle  className="flex items-center gap-2"><CircleDot /> Proporção Pago vs. A Pagar</CardTitle>
                    <CardDescription>Execução financeira total de {currentYear}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={chartData.pie}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                innerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                strokeWidth={2}
                            >
                                {chartData.pie.map((entry:any, index:number) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp/> Top 10 Funções por Valor Empenhado</CardTitle>
                  <CardDescription>Principais áreas de destinação das emendas.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData.funcao} layout="vertical" margin={{ left: 20, right: 20 }}>
                           <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
                          <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            formatter={(value: number) => formatCurrency(value)}
                          />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle  className="flex items-center gap-2"><FileText/> Emendas Recentes ({currentYear})</CardTitle>
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
                        <TableHead>Número</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead className="text-right">Valor Pago</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {kpiData.recentAmendments.length > 0 ? kpiData.recentAmendments.map((amendment: Emenda) => (
                        <TableRow key={amendment.codigoEmenda}>
                        <TableCell className="font-medium">{amendment.numeroEmenda}</TableCell>
                        <TableCell className="truncate max-w-xs">{amendment.autor}</TableCell>
                        <TableCell className="text-right">{amendment.valorPago}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            Nenhuma emenda encontrada para o ano de {currentYear}.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
