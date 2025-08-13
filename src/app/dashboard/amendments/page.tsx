
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AmendmentSummarizer } from "@/components/amendment-summarizer";
import { getEmendas, type Emenda } from "@/services/transparencia-api";
import { Filter, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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

export default function AmendmentsPage() {
  const [amendments, setAmendments] = React.useState<Emenda[]>([]);
  const [filteredAmendments, setFilteredAmendments] = React.useState<Emenda[]>([]);
  const [filters, setFilters] = React.useState({
    ano: "",
    tipoEmenda: "",
    autor: "",
    numeroEmenda: "",
    localidadeGasto: "",
    funcao: "",
    subfuncao: "",
    valorEmpenhado: "",
    valorPago: "",
  });

  React.useEffect(() => {
    async function fetchData() {
      const data = await getEmendas(2023);
      setAmendments(data);
      setFilteredAmendments(data);
    }
    fetchData();
  }, []);

  const handleFilterChange = (column: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };
  
  React.useEffect(() => {
    let filteredData = [...amendments];
    
    (Object.keys(filters) as Array<keyof typeof filters>).forEach((key) => {
      const filterValue = filters[key]?.toLowerCase();
      if (filterValue) {
        filteredData = filteredData.filter((amendment) => {
          const amendmentValue = String(amendment[key as keyof Emenda] ?? '').toLowerCase();
          return amendmentValue.includes(filterValue);
        });
      }
    });

    setFilteredAmendments(filteredData);
  }, [filters, amendments]);

  return (
    <div className="space-y-6">
      <AmendmentSummarizer />

      <Card>
        <CardHeader>
          <CardTitle>Emendas Parlamentares</CardTitle>
          <CardDescription>
            Uma lista detalhada de todas as emendas parlamentares registradas no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detalhar</TableHead>
                <TableHeaderCell
                  filterValue={filters.ano}
                  onFilterChange={(value) => handleFilterChange("ano", value)}
                >
                  Ano Emenda
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.tipoEmenda}
                  onFilterChange={(value) => handleFilterChange("tipoEmenda", value)}
                >
                  Tipo Emenda
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.autor}
                  onFilterChange={(value) => handleFilterChange("autor", value)}
                >
                  Autor da Emenda
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.numeroEmenda}
                  onFilterChange={(value) => handleFilterChange("numeroEmenda", value)}
                >
                  Número da Emenda
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.localidadeGasto}
                  onFilterChange={(value) => handleFilterChange("localidadeGasto", value)}
                >
                  Localidade do Gasto
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.funcao}
                  onFilterChange={(value) => handleFilterChange("funcao", value)}
                >
                  Função
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.subfuncao}
                  onFilterChange={(value) => handleFilterChange("subfuncao", value)}
                >
                  Subfunção
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.valorEmpenhado}
                  onFilterChange={(value) => handleFilterChange("valorEmpenhado", value)}
                >
                  Valor Empenhado
                </TableHeaderCell>
                <TableHeaderCell
                  filterValue={filters.valorPago}
                  onFilterChange={(value) => handleFilterChange("valorPago", value)}
                >
                  Valor Pago
                </TableHeaderCell>
                <TableHead>Valor à Liberar</TableHead>
                <TableHead>Porcentagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmendments.length > 0 ? (
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
                      <TableCell>{amendment.numeroEmenda}</TableCell>
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
                    Nenhum resultado encontrado.
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
