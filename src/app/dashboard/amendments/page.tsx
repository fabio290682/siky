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
  const [filter, setFilter] = useState('parlamentares');

  const filteredAmendments = amendments.filter(amendment => {
    if (filter === 'senadores') {
      return amendment.autor.toLowerCase().includes('senador');
    }
    if (filter === 'parlamentares') {
      return true;
    }
    // The new filters do not have associated data, so they will show an empty table for now.
    if (['siop', 'sismob', 'investsus'].includes(filter)) {
        return false;
    }
    return true;
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
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant={filter === 'parlamentares' ? 'default' : 'outline'} onClick={() => setFilter('parlamentares')}>
              Parlamentares
            </Button>
            <Button variant={filter === 'senadores' ? 'default' : 'outline'} onClick={() => setFilter('senadores')}>
              Senadores
            </Button>
            <Button variant={filter === 'siop' ? 'default' : 'outline'} onClick={() => setFilter('siop')}>
              Siop
            </Button>
            <Button variant={filter === 'sismob' ? 'default' : 'outline'} onClick={() => setFilter('sismob')}>
              Sismob
            </Button>
            <Button variant={filter === 'investsus' ? 'default' : 'outline'} onClick={() => setFilter('investsus')}>
              Investsus
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
              {filteredAmendments.length > 0 ? (
                filteredAmendments.map((amendment) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
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
