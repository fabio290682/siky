
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
import { conventions } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

type Convention = (typeof conventions)[0];
type ConventionKeys = keyof Convention;


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

const TableHeaderCell = ({
  children,
  filterValue,
  onFilterChange,
}: {
  children: React.ReactNode;
  filterValue: string;
  onFilterChange: (value: string) => void;
}) => (
  <TableHead>
    <div className="flex items-center gap-2">
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar..."
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="h-8"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </TableHead>
);

export default function ConventionsPage() {
    const [allConventions] = React.useState<Convention[]>(conventions);
    const [filteredConventions, setFilteredConventions] = React.useState<Convention[]>(conventions);
    const [filters, setFilters] = React.useState<Record<ConventionKeys, string>>({
        ano: "",
        numero: "",
        situacao: "",
        uf: "",
        municipio: "",
        proponente: "",
        convenente: "",
        objeto: "",
        valorConvenio: "",
        valorLiberado: "",
        saldoALiberar: "",
        inicioVigencia: "",
        fimVigencia: "",
        diasRestantes: "",
        percentualLiberado: ""
      });

    const handleFilterChange = (column: ConventionKeys, value: string) => {
        setFilters((prev) => ({ ...prev, [column]: value }));
    };
    
    React.useEffect(() => {
        let filteredData = [...allConventions];
        
        (Object.keys(filters) as ConventionKeys[]).forEach((key) => {
          const filterValue = filters[key]?.toString().toLowerCase();
          if (filterValue) {
            filteredData = filteredData.filter((convention) => {
              const conventionValue = String(convention[key] ?? '').toLowerCase();
              return conventionValue.includes(filterValue);
            });
          }
        });
    
        setFilteredConventions(filteredData);
    }, [filters, allConventions]);


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
              <TableHeaderCell filterValue={filters.ano} onFilterChange={(value) => handleFilterChange("ano", value)}>Ano</TableHeaderCell>
              <TableHead>Detalhar</TableHead>
              <TableHeaderCell filterValue={filters.numero} onFilterChange={(value) => handleFilterChange("numero", value)}>Número</TableHeaderCell>
              <TableHeaderCell filterValue={filters.situacao} onFilterChange={(value) => handleFilterChange("situacao", value)}>Situação</TableHeaderCell>
              <TableHeaderCell filterValue={filters.uf} onFilterChange={(value) => handleFilterChange("uf", value)}>UF</TableHeaderCell>
              <TableHeaderCell filterValue={filters.municipio} onFilterChange={(value) => handleFilterChange("municipio", value)}>Município</TableHeaderCell>
              <TableHeaderCell filterValue={filters.proponente} onFilterChange={(value) => handleFilterChange("proponente", value)}>Proponente</TableHeaderCell>
              <TableHeaderCell filterValue={filters.convenente} onFilterChange={(value) => handleFilterChange("convenente", value)}>Convenente</TableHeaderCell>
              <TableHeaderCell filterValue={filters.objeto} onFilterChange={(value) => handleFilterChange("objeto", value)}>Objeto</TableHeaderCell>
              <TableHeaderCell filterValue={filters.valorConvenio} onFilterChange={(value) => handleFilterChange("valorConvenio", value)}>Valor do Convênio</TableHeaderCell>
              <TableHeaderCell filterValue={filters.valorLiberado} onFilterChange={(value) => handleFilterChange("valorLiberado", value)}>Valor Liberado</TableHeaderCell>
              <TableHeaderCell filterValue={filters.saldoALiberar} onFilterChange={(value) => handleFilterChange("saldoALiberar", value)}>Saldo a Liberar</TableHeaderCell>
              <TableHeaderCell filterValue={filters.inicioVigencia} onFilterChange={(value) => handleFilterChange("inicioVigencia", value)}>Início Vigência</TableHeaderCell>
              <TableHeaderCell filterValue={filters.fimVigencia} onFilterChange={(value) => handleFilterChange("fimVigencia", value)}>Fim Vigência</TableHeaderCell>
              <TableHeaderCell filterValue={filters.diasRestantes} onFilterChange={(value) => handleFilterChange("diasRestantes", value)}>Dias Restantes</TableHeaderCell>
              <TableHeaderCell filterValue={String(filters.percentualLiberado)} onFilterChange={(value) => handleFilterChange("percentualLiberado", value)}>% Liberado</TableHeaderCell>
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
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
