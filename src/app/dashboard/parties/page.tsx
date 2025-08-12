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
import { Building } from "lucide-react";

export default async function PartiesPage() {
    const { dados: partidos } = await getPartidos();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    Partidos Políticos
                </CardTitle>
                <CardDescription>
                    Lista de partidos políticos com seus líderes na Câmara.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sigla</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Líder na Câmara</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partidos.map((partido) => (
                            <TableRow key={partido.id}>
                                <TableCell className="font-medium">{partido.sigla}</TableCell>
                                <TableCell>{partido.nome}</TableCell>
                                <TableCell>{partido.status?.lider?.nome || 'Não informado'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
