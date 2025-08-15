
"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
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
import type { Convention } from "@/lib/data";

type ConventionsClientContentProps = {
    conventions: Convention[];
    initialFilters: { [key: string]: string | string[] | undefined };
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

export function ConventionsClientContent({ conventions, initialFilters }: ConventionsClientContentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [filters, setFilters] = React.useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        for(const key in initialFilters) {
            const value = initialFilters[key];
            if (typeof value === 'string') {
                initial[key] = value;
            }
        }
        return initial;
    });

    const handleFilterChange = (column: string, value: string) => {
        const newFilters = { ...filters, [column]: value };
        setFilters(newFilters);

        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!value) {
            current.delete(column);
        } else {
            current.set(column, value);
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
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
            {conventions.length > 0 ? (
                conventions.map((convention) => (
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
                    Nenhum convênio encontrado.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
  );
}
