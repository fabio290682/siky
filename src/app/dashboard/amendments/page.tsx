"use client"

import { useState } from "react";
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
import { amendments } from "@/lib/data";
import { Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AmendmentDetailDialog } from "@/components/amendment-detail-dialog";

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
    <TableHead>
        <div className="flex items-center gap-2">
            {children}
            <Button variant="ghost" size="icon" className="h-6 w-6">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
    </TableHead>
);

export default function AmendmentsPage() {
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
                <TableHeaderCell>Ano Emenda</TableHeaderCell>
                <TableHeaderCell>Tipo Emenda</TableHeaderCell>
                <TableHeaderCell>Autor da Emenda</TableHeaderCell>
                <TableHeaderCell>Número da Emenda</TableHeaderCell>
                <TableHeaderCell>Localidade do Gasto</TableHeaderCell>
                <TableHeaderCell>Função</TableHeaderCell>
                <TableHeaderCell>Subfunção</TableHeaderCell>
                <TableHeaderCell>Valor Empenhado</TableHeaderCell>
                <TableHeaderCell>Valor Pago</TableHeaderCell>
                <TableHeaderCell>Valor à Liberar</TableHeaderCell>
                <TableHeaderCell>Porcentagem</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amendments.length > 0 ? (
                amendments.map((amendment) => (
                  <TableRow key={amendment.id}>
                    <TableCell>
                      <AmendmentDetailDialog amendmentId={amendment.id}>
                        <Button variant="outline" size="sm">Detalhar</Button>
                      </AmendmentDetailDialog>
                    </TableCell>
                    <TableCell>{amendment.ano}</TableCell>
                    <TableCell>{amendment.tipo}</TableCell>
                    <TableCell>{amendment.autor}</TableCell>
                    <TableCell>{amendment.numero}</TableCell>
                    <TableCell>{amendment.localidade}</TableCell>
                    <TableCell>{amendment.funcao}</TableCell>
                    <TableCell>{amendment.subfuncao}</TableCell>
                    <TableCell>{amendment.valorEmpenhado}</TableCell>
                    <TableCell>{amendment.valorPago}</TableCell>
                    <TableCell>{amendment.valorLiberar}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={amendment.porcentagem} className="w-24" />
                            <span>{amendment.porcentagem.toFixed(2)}%</span>
                        </div>
                    </TableCell>
                  </TableRow>
                ))
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
