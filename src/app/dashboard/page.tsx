
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
import { ArrowUpRight, DollarSign, Users, Landmark, FileText, TrendingUp, CircleDot, BarChartHorizontal } from "lucide-react"
import { getEmendas, type Emenda } from "@/services/transparencia-api"
import { getDeputados } from "@/services/camara-api"
import { DashboardClientContent } from "@/components/dashboard-client-content";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
};

const parseCurrency = (value: string) => {
    if (!value || typeof value !== "string") return 0;
    return parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
};

const KpiCard = ({ title, value, description, icon: Icon, className, delay = 0 }: { title: string, value: string, description: string, icon: React.ElementType, className?: string, delay?: number }) => (
    <div className="animate-fade-in" style={{ animationDelay: `${delay}s` }}>
        <Card className={cn("card-custom text-white h-full", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-white/80">{description}</p>
            </CardContent>
        </Card>
    </div>
);


export default async function DashboardPage() {
    const currentYear = new Date().getFullYear();

    const [emendasData, deputadosData] = await Promise.all([
        getEmendas(currentYear),
        getDeputados()
    ]);

    const totalUsers = deputadosData.dados.length;

    const totalValores = emendasData.reduce((acc, emenda) => {
        acc.pago += parseCurrency(emenda.valorPago);
        acc.empenhado += parseCurrency(emenda.valorEmpenhado);
        return acc;
    }, { pago: 0, empenhado: 0 });

    const valorALiberar = totalValores.empenhado - totalValores.pago;

    const kpiData = {
        totalEmpenhado: totalValores.empenhado,
        totalPago: totalValores.pago,
        valorALiberar,
        totalUsers,
        recentAmendments: emendasData.slice(0, 5)
    };

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', ''),
      Empenhado: 0,
      Pago: 0,
    }));

    emendasData.forEach((emenda) => {
        const monthIndex = Math.floor(Math.random() * 12);
        monthlyData[monthIndex].Empenhado += parseCurrency(emenda.valorEmpenhado);
        monthlyData[monthIndex].Pago += parseCurrency(emenda.valorPago);
    });

    const chartData = {
        monthly: monthlyData,
        pie: [
            { name: 'Valor Pago', value: totalValores.pago },
            { name: 'A Pagar', value: valorALiberar > 0 ? valorALiberar : 0 }
        ],
        funcao: emendasData.reduce((acc, emenda) => {
            const funcao = emenda.funcao || 'Não informada';
            if (!acc[funcao]) {
                acc[funcao] = { name: funcao, value: 0 };
            }
            acc[funcao].value += parseCurrency(emenda.valorEmpenhado);
            return acc;
        }, {} as Record<string, {name: string, value: number}>)
    };

    const chartDataFuncao = Object.values(chartData.funcao).sort((a,b) => b.value - a.value).slice(0, 10);

  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard 
                title={`Total Empenhado (${currentYear})`}
                value={formatCurrency(kpiData.totalEmpenhado)}
                description="Valor total comprometido para o ano"
                icon={Landmark}
                className="bg-primary"
                delay={0}
            />
             <KpiCard 
                title={`Total Pago (${currentYear})`}
                value={formatCurrency(kpiData.totalPago)}
                description="Valor efetivamente transferido"
                icon={DollarSign}
                className="bg-accent"
                delay={0.2}
            />
             <KpiCard 
                title="Saldo a Liberar"
                value={formatCurrency(kpiData.valorALiberar)}
                description="Restante do valor empenhado"
                icon={TrendingUp}
                className="bg-warning-custom"
                delay={0.4}
            />
             <KpiCard 
                title="Parlamentares Ativos"
                value={`${kpiData.totalUsers}`}
                description="Deputados federais em exercício"
                icon={Users}
                className="bg-info-custom"
                delay={0.6}
            />
        </div>

        <DashboardClientContent 
            chartData={{...chartData, funcao: chartDataFuncao}} 
        />

        <div className="grid gap-6 md:grid-cols-1">
            <Card className="card-custom">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle className="flex items-center gap-2"><FileText/> Emendas Recentes ({currentYear})</CardTitle>
                        <CardDescription>
                        As últimas emendas parlamentares adicionadas.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1 btn-custom">
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
