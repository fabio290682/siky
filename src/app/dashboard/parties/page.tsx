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
import { getPartidos } from "@/services/camara-api";
import { getLiderancasSenado } from "@/services/senado-api";
import { Users, Building } from "lucide-react";

export default async function PartiesPage() {
    const { dados: partidos } = await getPartidos();
    const liderancas = await getLiderancasSenado();

    const liderancasMap = new Map();
    if (liderancas) {
        liderancas.forEach(l => {
            if (l.IdentificacaoBloco) {
                 liderancasMap.set(l.IdentificacaoBloco.Sigla, l.Lideres?.Lider[0]?.IdentificacaoParlamentar.NomeParlamentar);
            } else if (l.IdentificacaoPartido) {
                liderancasMap.set(l.IdentificacaoPartido.Sigla, l.Lideres?.Lider[0]?.IdentificacaoParlamentar.NomeParlamentar);
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    Partidos Políticos
                </CardTitle>
                <CardDescription>
                    Lista de partidos políticos com seus líderes na Câmara e no Senado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sigla</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Líder na Câmara</TableHead>
                            <TableHead>Líder no Senado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partidos.map((partido) => (
                            <TableRow key={partido.id}>
                                <TableCell className="font-medium">{partido.sigla}</TableCell>
                                <TableCell>{partido.nome}</TableCell>
                                <TableCell>{partido.status?.lider?.nome || 'Não informado'}</TableCell>
                                <TableCell>{liderancasMap.get(partido.sigla) || 'Não informado'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
