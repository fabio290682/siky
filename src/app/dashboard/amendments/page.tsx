"use client"

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'aprovada':
      return 'default';
    case 'em análise':
      return 'secondary';
    case 'pendente':
      return 'outline';
    case 'rejeitada':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function AmendmentsPage() {
  const [filter, setFilter] = useState('all');

  const filteredAmendments = amendments.filter(amendment => {
    if (filter === 'senadores') {
      return amendment.autor.toLowerCase().includes('senador');
    }
    return true; // 'all'
  });

  return (
    <div className="space-y-6">
      <AmendmentSummarizer />
      
      <Card>
        <CardHeader>
          <CardTitle>Emendas Parlamentares</CardTitle>
          <CardDescription>
            Uma lista de todas as emendas parlamentares registradas no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
              Parlamentares
            </Button>
            <Button variant={filter === 'senadores' ? 'default' : 'outline'} onClick={() => setFilter('senadores')}>
              Senadores
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emenda</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmendments.map((amendment) => (
                <TableRow key={amendment.id}>
                  <TableCell className="font-medium">{amendment.id}</TableCell>
                  <TableCell>{amendment.autor}</TableCell>
                  <TableCell>{amendment.funcao}</TableCell>
                  <TableCell>{amendment.valor}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(amendment.status)}>
                      {amendment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}