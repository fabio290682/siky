
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AmendmentSummarizer } from "@/components/amendment-summarizer";
import { getEmendas, type Emenda } from "@/services/transparencia-api";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Filter, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const parseCurrency = (value: string) => {
  if (!value || typeof value !== "string") return 0;
  return parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const calculateAmendmentValues = (emenda: Emenda) => {
  const valorEmpenhado = parseCurrency(emenda.valorEmpenhado);
  const valorPago = parseCurrency(emenda.valorPago);

  const valorLiberar = valorEmpenhado - valorPago;
  const porcentagem = valorEmpenhado > 0 ? (valorPago / valorEmpenhado) * 100 : 0;

  return {
    valorLiberar: formatCurrency(valorLiberar),
    porcentagem: porcentagem,
  };
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2015; year--) {
    years.push(year.toString());
  }
  return years;
};

export default function AmendmentsPage() {
  const [allAmendments, setAllAmendments] = React.useState<Emenda[]>([]);
  const [filteredAmendments, setFilteredAmendments] = React.useState<Emenda[]>([]);
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = React.useState<string>(new Date().getFullYear().toString());
  const [isLoading, setIsLoading] = React.useState(false);

  const yearOptions = generateYearOptions();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getEmendas(parseInt(selectedYear));
      setAllAmendments(data);
      setFilteredAmendments(data);
      setIsLoading(false);
    }
    fetchData();
  }, [selectedYear]);

  React.useEffect(() => {
    let filteredData = [...allAmendments];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(item =>
          String(item[key as keyof Emenda]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredAmendments(filteredData);
  }, [filters, allAmendments]);

  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  const renderFilter = (column: keyof Emenda, title: string) => (
    <div className="flex items-center gap-2">
      <span>{title}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Filter className="h-4 w-4" />
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
    </div>
  );

  return (
    <div className="space-y-6">
      <AmendmentSummarizer 
        amendments={allAmendments}
        year={selectedYear}
        isLoadingAmendments={isLoading}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Emendas Parlamentares</CardTitle>
              <CardDescription>
                Uma lista detalhada de todas as emendas parlamentares registradas no sistema.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label htmlFor="year-select">Ano</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year-select" className="w-[120px]">
                    <SelectValue placeholder="Selecione o Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detalhar</TableHead>
                <TableHead>{renderFilter('ano', 'Ano Emenda')}</TableHead>
                <TableHead>{renderFilter('tipoEmenda', 'Tipo Emenda')}</TableHead>
                <TableHead>{renderFilter('autor', 'Autor da Emenda')}</TableHead>
                <TableHead>{renderFilter('numeroEmenda', 'Número da Emenda')}</TableHead>
                <TableHead>{renderFilter('localidadeGasto', 'Localidade do Gasto')}</TableHead>
                <TableHead>{renderFilter('funcao', 'Função')}</TableHead>
                <TableHead>{renderFilter('subfuncao', 'Subfunção')}</TableHead>
                <TableHead>{renderFilter('valorEmpenhado', 'Valor Empenhado')}</TableHead>
                <TableHead>{renderFilter('valorPago', 'Valor Pago')}</TableHead>
                <TableHead>Valor à Liberar</TableHead>
                <TableHead>Porcentagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={12} className="h-36 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-muted-foreground">Buscando emendas...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredAmendments.length > 0 ? (
                filteredAmendments.map((amendment) => {
                  const { valorLiberar, porcentagem } =
                    calculateAmendmentValues(amendment);
                  return (
                    <TableRow key={`${amendment.codigoEmenda}-${amendment.ano}`}>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`https://portaldatransparencia.gov.br/emendas/detalhe?codigoEmenda=${amendment.codigoEmenda}&ordenarPor=data&direcao=asc`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Detalhar
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>{amendment.ano}</TableCell>
                      <TableCell>{amendment.tipoEmenda}</TableCell>
                      <TableCell>{amendment.autor}</TableCell>
                      <TableCell>
                        <Link
                            href={`https://portaldatransparencia.gov.br/emendas/detalhe?codigoEmenda=${amendment.codigoEmenda}&ordenarPor=data&direcao=asc`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-primary"
                        >
                            {amendment.numeroEmenda}
                        </Link>
                      </TableCell>
                      <TableCell>{amendment.localidadeGasto}</TableCell>
                      <TableCell>{amendment.funcao}</TableCell>
                      <TableCell>{amendment.subfuncao}</TableCell>
                      <TableCell>{amendment.valorEmpenhado}</TableCell>
                      <TableCell>{amendment.valorPago}</TableCell>
                      <TableCell>{valorLiberar}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={porcentagem} className="w-24" />
                          <span>{porcentagem.toFixed(2)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="h-24 text-center">
                    Nenhum resultado encontrado para o ano de {selectedYear}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
