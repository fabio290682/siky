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
import { conventions } from "@/lib/data";
import { cn } from "@/lib/utils";

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'ativo':
      return 'default';
    case 'concluído':
      return 'secondary';
    case 'pendente':
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
              <TableHead>Convênio</TableHead>
              <TableHead>Proponente</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>UF</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conventions.map((convention) => (
              <TableRow key={convention.id}>
                <TableCell className="font-medium">{convention.id}</TableCell>
                <TableCell>{convention.proponente}</TableCell>
                <TableCell>{convention.valor}</TableCell>
                <TableCell>{convention.uf}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(convention.situacao)}>
                    {convention.situacao}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
