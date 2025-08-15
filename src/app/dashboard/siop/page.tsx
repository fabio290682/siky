
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowUpRight, DollarSign, Target, Landmark } from "lucide-react";
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
 
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-6 w-6" />
              SIOP - Sistema Integrado de Planejamento e Orçamento
          </CardTitle>
          <CardDescription>
              O SIOP é a ferramenta do governo federal brasileiro que centraliza o planejamento e a execução do orçamento público, oferecendo transparência e acesso aos dados orçamentários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg bg-background/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-primary">Acesse os Dados Oficiais</h3>
                    <p className="text-muted-foreground mt-1 max-w-2xl">
                        Explore os painéis, relatórios e dados detalhados diretamente no portal oficial do SIOP para obter informações atualizadas sobre o orçamento da União.
                    </p>
                </div>
                <Button asChild>
                    <Link href="https://www.gov.br/planejamento/pt-br/assuntos/orcamento/siop" target="_blank" rel="noopener noreferrer">
                        Acessar Portal do SIOP
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
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
          <CardTitle>Sobre a Integração</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Atualmente, a integração direta com a API do SIOP está em desenvolvimento. Para realizar consultas e extrair dados detalhados, recomendamos o uso do portal oficial. Futuras versões desta aplicação permitirão a conexão direta para visualização de dados orçamentários personalizados.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
