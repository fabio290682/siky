

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
<<<<<<< HEAD
import { staticConventions, type Convention } from "@/lib/data";
import { ConventionsClientContent } from "@/components/conventions-client-content";
=======

type Convention = {
    ano: number;
    numero: string;
    situacao: string;
    uf: string;
    municipio: string;
    proponente: string;
    convenente: string;
    objeto: string;
    valorConvenio: string;
    valorLiberado: string;
    saldoALiberar: string;
    inicioVigencia: string;
    fimVigencia: string;
    diasRestantes: string;
    percentualLiberado: number;
};

export const staticConventions: Convention[] = [
    {
        ano: 2023,
        numero: "947852",
        situacao: "Em execução",
        uf: "SP",
        municipio: "São Paulo",
        proponente: "PREFEITURA MUNICIPAL DE SAO PAULO",
        convenente: "Ministério da Saúde",
        objeto: "Construção de Unidade Básica de Saúde no bairro Jardim das Flores.",
        valorConvenio: "R$ 1.500.000,00",
        valorLiberado: "R$ 750.000,00",
        saldoALiberar: "R$ 750.000,00",
        inicioVigencia: "01/01/2023",
        fimVigencia: "31/12/2024",
        diasRestantes: "580",
        percentualLiberado: 50
    },
    {
        ano: 2022,
        numero: "935641",
        situacao: "Adimplente",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        proponente: "GOVERNO DO ESTADO DO RIO DE JANEIRO",
        convenente: "Ministério da Educação",
        objeto: "Aquisição de equipamentos de informática para escolas da rede estadual.",
        valorConvenio: "R$ 2.000.000,00",
        valorLiberado: "R$ 2.000.000,00",
        saldoALiberar: "R$ 0,00",
        inicioVigencia: "15/03/2022",
        fimVigencia: "14/03/2023",
        diasRestantes: "0",
        percentualLiberado: 100
    },
    {
        ano: 2023,
        numero: "951234",
        situacao: "Aguardando Prestação de Contas",
        uf: "MG",
        municipio: "Belo Horizonte",
        proponente: "PREFEITURA MUNICIPAL DE BELO HORIZONTE",
        convenente: "Ministério da Cultura",
        objeto: "Realização do Festival de Inverno de Belo Horizonte.",
        valorConvenio: "R$ 500.000,00",
        valorLiberado: "R$ 500.000,00",
        saldoALiberar: "R$ 0,00",
        inicioVigencia: "01/06/2023",
        fimVigencia: "31/08/2023",
        diasRestantes: "0",
        percentualLiberado: 100
    },
    {
        ano: 2024,
        numero: "963321",
        situacao: "Prestação de Contas em Análise",
        uf: "BA",
        municipio: "Salvador",
        proponente: "SECRETARIA DE TURISMO DA BAHIA",
        convenente: "Ministério do Turismo",
        objeto: "Apoio a projetos de desenvolvimento do turismo local.",
        valorConvenio: "R$ 800.000,00",
        valorLiberado: "R$ 400.000,00",
        saldoALiberar: "R$ 400.000,00",
        inicioVigencia: "01/02/2024",
        fimVigencia: "31/01/2025",
        diasRestantes: "215",
        percentualLiberado: 50
    },
     {
        ano: 2021,
        numero: "921122",
        situacao: "Cancelado",
        uf: "AM",
        municipio: "Manaus",
        proponente: "PREFEITURA MUNICIPAL DE MANAUS",
        convenente: "Ministério do Meio Ambiente",
        objeto: "Projeto de preservação de nascentes na área urbana de Manaus.",
        valorConvenio: "R$ 300.000,00",
        valorLiberado: "R$ 0,00",
        saldoALiberar: "R$ 300.000,00",
        inicioVigencia: "10/05/2021",
        fimVigencia: "09/05/2022",
        diasRestantes: "0",
        percentualLiberado: 0
    },
];
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'adimplente':
    case 'em execução':
      return 'default';
    case 'prestação de contas em análise':
    case 'aguardando prestação de contas':
      return 'secondary';
    case 'prestação de contas enviada para análise':
        return 'outline';
    case 'cancelado':
      return 'destructive';
    default:
      return 'outline';
  }
};

type ConventionsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ConventionsPage({ searchParams }: ConventionsPageProps) {
    const allConventions: Convention[] = staticConventions;

    let filteredConventions = [...allConventions];
    
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
            filteredConventions = filteredConventions.filter(item =>
                String(item[key as keyof Convention]).toLowerCase().includes(value.toLowerCase())
            );
        }
    });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Convênios</CardTitle>
        <CardDescription>
          Uma lista de todos os convênios registrados no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConventionsClientContent
          conventions={filteredConventions}
          initialFilters={searchParams}
        />
      </CardContent>
    </Card>
  );
}

