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
import { Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

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

const parseCurrency = (value: string) => {
    if (!value || typeof value !== 'string') return 0;
    return parseFloat(value.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

const calculateAmendmentValues = (emenda: Emenda) => {
    const valorEmpenhado = parseCurrency(emenda.valorEmpenhado);
    const valorPago = parseCurrency(emenda.valorPago);

    const valorLiberar = valorEmpenhado - valorPago;
    const porcentagem = valorEmpenhado > 0 ? (valorPago / valorEmpenhado) * 100 : 0;

    return {
        valorLiberar: formatCurrency(valorLiberar),
        porcentagem: porcentagem,
    };
}


export default async function AmendmentsPage() {
  const amendments = await getEmendas(2023);

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
                amendments.map((amendment) => {
                    const { valorLiberar, porcentagem } = calculateAmendmentValues(amendment);
                    return (
                        <TableRow key={amendment.codigoEmenda}>
                            <TableCell>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`https://portaldatransparencia.gov.br/emendas/detalhe?codigoEmenda=${amendment.codigoEmenda}&ordenarPor=data&direcao=asc`} target="_blank" rel="noopener noreferrer">
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
                    )
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
