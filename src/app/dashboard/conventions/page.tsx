
"use client";

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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export default function ConventionsPage() {
    const [allConventions, setAllConventions] = React.useState<Convention[]>([]);
    const [filteredConventions, setFilteredConventions] = React.useState<Convention[]>([]);
    const [filters, setFilters] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
      // In a real application, this data would be fetched from an API.
      // Since we removed the static data, we'll start with an empty array.
      const initialData: Convention[] = []; 
      setAllConventions(initialData);
      setFilteredConventions(initialData);
    }, []);

    React.useEffect(() => {
        let filteredData = [...allConventions];
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filteredData = filteredData.filter(item =>
                    String(item[key as keyof Convention]).toLowerCase().includes(value.toLowerCase())
                );
            }
        });
        setFilteredConventions(filteredData);
    }, [filters, allConventions]);

    const handleFilterChange = (column: string, value: string) => {
        setFilters(prev => ({ ...prev, [column]: value }));
    };

    const renderFilter = (column: keyof Convention, title: string) => (
      <Popover>
          <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                  {title}
                  <Filter className="ml-2 h-4 w-4" />
              </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="start">
              <Input
                  placeholder={`Filtrar ${title}...`}
                  value={filters[column] || ""}
                  onChange={(e) => handleFilterChange(column, e.target.value)}
                  className="w-full"
              />
          </PopoverContent>
      </Popover>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Convênios</CardTitle>
        <CardDescription>
          Uma lista de todos os convênios registrados no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{renderFilter('ano', 'Ano')}</TableHead>
              <TableHead>Detalhar</TableHead>
              <TableHead>{renderFilter('numero', 'Número')}</TableHead>
              <TableHead>{renderFilter('situacao', 'Situação')}</TableHead>
              <TableHead>{renderFilter('uf', 'UF')}</TableHead>
              <TableHead>{renderFilter('municipio', 'Município')}</TableHead>
              <TableHead>{renderFilter('proponente', 'Proponente')}</TableHead>
              <TableHead>{renderFilter('convenente', 'Convenente')}</TableHead>
              <TableHead>{renderFilter('objeto', 'Objeto')}</TableHead>
              <TableHead>{renderFilter('valorConvenio', 'Valor do Convênio')}</TableHead>
              <TableHead>{renderFilter('valorLiberado', 'Valor Liberado')}</TableHead>
              <TableHead>{renderFilter('saldoALiberar', 'Saldo a Liberar')}</TableHead>
              <TableHead>{renderFilter('inicioVigencia', 'Início Vigência')}</TableHead>
              <TableHead>{renderFilter('fimVigencia', 'Fim Vigência')}</TableHead>
              <TableHead>{renderFilter('diasRestantes', 'Dias Restantes')}</TableHead>
              <TableHead>{renderFilter('percentualLiberado', '% Liberado')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConventions.length > 0 ? (
                filteredConventions.map((convention) => (
                <TableRow key={convention.numero}>
                    <TableCell>{convention.ano}</TableCell>
                    <TableCell>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`https://portaldatransparencia.gov.br/convenios/${convention.numero}?ordenarPor=data&direcao=desc`} target="_blank" rel="noopener noreferrer">
                        Detalhar
                        </Link>
                    </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Link 
                        href={`https://discricionarias.transferegov.sistema.gov.br/voluntarias/ConsultarProposta/ResultadoDaConsultaDeConvenioSelecionarConvenio.do?sequencialConvenio=${convention.numero}&Usr=guest&Pwd=guest`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-primary"
                    >
                        {convention.numero}
                    </Link>
                    </TableCell>
                    <TableCell>
                    <Badge variant={getStatusVariant(convention.situacao)} className="whitespace-nowrap">
                        {convention.situacao}
                    </Badge>
                    </TableCell>
                    <TableCell>{convention.uf}</TableCell>
                    <TableCell>{convention.municipio}</TableCell>
                    <TableCell>{convention.proponente}</TableCell>
                    <TableCell>{convention.convenente}</TableCell>
                    <TableCell className="max-w-xs truncate">{convention.objeto}</TableCell>
                    <TableCell>{convention.valorConvenio}</TableCell>
                    <TableCell>{convention.valorLiberado}</TableCell>
                    <TableCell>{convention.saldoALiberar}</TableCell>
                    <TableCell>{convention.inicioVigencia}</TableCell>
                    <TableCell>{convention.fimVigencia}</TableCell>
                    <TableCell>{convention.diasRestantes}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={convention.percentualLiberado} className="w-24" />
                            <span>{convention.percentualLiberado.toFixed(2)}%</span>
                        </div>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={16} className="h-24 text-center">
                    Nenhum convênio encontrado. Carregue dados no seu banco de dados.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
