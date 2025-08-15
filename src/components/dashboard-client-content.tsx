
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts"
import { BarChartHorizontal, CircleDot, TrendingUp } from "lucide-react"

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

const PIE_COLORS = ['hsl(var(--accent))', 'hsl(var(--warning-custom))'];

export function DashboardClientContent({ chartData }: { chartData: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-custom">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChartHorizontal/> Execução Mensal (Empenhado vs. Pago)</CardTitle>
                <CardDescription>Comparativo de valores ao longo de {new Date().getFullYear()}</CardDescription>
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
                        <Bar dataKey="Pago" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="card-custom">
            <CardHeader>
                <CardTitle  className="flex items-center gap-2"><CircleDot /> Proporção Pago vs. A Pagar</CardTitle>
                <CardDescription>Execução financeira total de {new Date().getFullYear()}</CardDescription>
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
        <Card className="card-custom lg:col-span-2">
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
    </div>
  )
}
