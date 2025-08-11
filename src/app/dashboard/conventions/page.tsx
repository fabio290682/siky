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
              <TableHead>Ano</TableHead>
              <TableHead>Detalhar</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>UF</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>Proponente</TableHead>
              <TableHead>Convenente</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead>Valor do Convênio</TableHead>
              <TableHead>Valor Liberado</TableHead>
              <TableHead>Saldo a Liberar</TableHead>
              <TableHead>Início Vigência</TableHead>
              <TableHead>Fim Vigência</TableHead>
              <TableHead>Dias Restantes</TableHead>
              <TableHead>% Liberado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conventions.map((convention) => (
              <TableRow key={convention.numero}>
                <TableCell>{convention.ano}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Detalhar
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{convention.numero}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
