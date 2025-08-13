
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
import { AmendmentSummarizer } from "@/components/amendment-summarizer";
import { getEmendas, type Emenda } from "@/services/transparencia-api";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

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

  React.useEffect(() => {
    async function fetchData() {
      const data = await getEmendas(2023);
      setAmendments(data);
    }
    fetchData();
  }, []);

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
                <TableHead>Ano Emenda</TableHead>
                <TableHead>Tipo Emenda</TableHead>
                <TableHead>Autor da Emenda</TableHead>
                <TableHead>Número da Emenda</TableHead>
                <TableHead>Localidade do Gasto</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Subfunção</TableHead>
                <TableHead>Valor Empenhado</TableHead>
                <TableHead>Valor Pago</TableHead>
                <TableHead>Valor à Liberar</TableHead>
                <TableHead>Porcentagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amendments.length > 0 ? (
                amendments.map((amendment) => {
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
