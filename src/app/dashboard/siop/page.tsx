
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, ArrowUpRight, DollarSign, Target, Landmark, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const kpiData = [
    {
        title: "Orçamento Aprovado (LOA)",
        value: "R$ 5,4 trilhões",
        description: "Lei Orçamentária Anual",
        icon: Landmark
    },
    {
        title: "Execução Orçamentária",
        value: "78%",
        description: "Percentual do orçamento executado",
        icon: Target
    },
    {
        title: "Investimento Público",
        value: "R$ 350 bilhões",
        description: "Valor destinado a investimentos",
        icon: ArrowUpRight
    },
    {
        title: "Despesas Primárias",
        value: "R$ 4,8 trilhões",
        description: "Total de despesas não financeiras",
        icon: DollarSign
    }
]

export default function SiopPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchUrl = `https://portaldatransparencia.gov.br/busca/resultados?termo=${encodeURIComponent(searchTerm)}`;
      window.open(searchUrl, "_blank");
    }
  }
 
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-6 w-6" />
              SIOP - Sistema Integrado de Planejamento e Orçamento
          </CardTitle>
          <CardDescription>
              O SIOP é a ferramenta do governo federal que centraliza o planejamento e a execução do orçamento. Consulte os dados via Portal da Transparência.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="p-6 border rounded-lg bg-background/50">
            <Label htmlFor="siop-search" className="text-lg font-semibold text-primary">Buscar no Orçamento Federal</Label>
            <p className="text-muted-foreground mt-1 mb-4">
              Pesquise por programas, ações, órgãos, ou qualquer termo relacionado ao orçamento.
            </p>
            <div className="flex w-full max-w-lg items-center space-x-2">
              <Input
                id="siop-search"
                type="text"
                placeholder="Ex: Saúde Indígena, 21A2..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
             <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Links Úteis e Recursos</CardTitle>
          <CardDescription>Acesse os portais oficiais para informações detalhadas e dados brutos.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">Portal do SIOP</h3>
                    <p className="text-sm text-muted-foreground">Painéis e relatórios oficiais.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="https://www.gov.br/planejamento/pt-br/assuntos/orcamento/siop" target="_blank" rel="noopener noreferrer">
                        Acessar Portal
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
                 <div>
                    <h3 className="font-semibold">API de Emendas</h3>
                    <p className="text-sm text-muted-foreground">Acesso para desenvolvedores.</p>
                </div>
                 <Button asChild variant="outline">
                    <Link href="https://www.siop.planejamento.gov.br/modulo/main/static/api-explorer.html#impositivo/emendas" target="_blank" rel="noopener noreferrer">
                        Explorar API
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
