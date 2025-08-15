

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
import { DashboardClientContent } from "@/components/dashboard-client-content"

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


export default async function DashboardPage() {
    const currentYear = new Date().getFullYear();

    const [emendasData, deputadosData] = await Promise.all([
        getEmendas({ano: currentYear, pagina: 1}),
        getDeputados()
    ]);

    const totalUsers = deputadosData?.dados?.length ?? 0;

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

    emendasData.forEach((emenda) => {
        // This is a mock distribution, replace with actual date parsing if available
        const monthIndex = Math.floor(Math.random() * 12);
        monthlyData[monthIndex].Empenhado += parseCurrency(emenda.valorEmpenhado);
        monthlyData[monthIndex].Pago += parseCurrency(emenda.valorPago);
    });
    
    const chartData = {
        funcao: chartDataFuncao,
        monthly: monthlyData,
        pie: [
            { name: 'Valor Pago', value: totalValores.pago },
            { name: 'A Pagar', value: valorALiberar > 0 ? valorALiberar : 0 }
        ]
    };
    
    if (emendasData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-xl text-muted-foreground">Não foi possível carregar os dados do dashboard.</p>
                <p className="text-sm text-muted-foreground">Verifique a configuração da chave de API do Portal da Transparência.</p>
            </div>
        )
    }

  return (
    <DashboardClientContent kpiData={kpiData} chartData={chartData} currentYear={currentYear} />
  )
}
