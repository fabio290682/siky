import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getDeputados } from "@/services/camara-api";
import { Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function ParliamentariansPage() {
    const { dados: deputados } = await getDeputados();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Parlamentares
                </CardTitle>
                <CardDescription>
                    Lista de deputados federais em exercício.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Deputado</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Partido</TableHead>
                            <TableHead>UF</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Detalhes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deputados.map((deputado) => (
                            <TableRow key={deputado.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={deputado.urlFoto} alt={deputado.nome} />
                                        <AvatarFallback>{deputado.nome.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{deputado.nome}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{deputado.siglaPartido}</Badge>
                                </TableCell>
                                <TableCell>{deputado.siglaUf}</TableCell>
                                <TableCell>
                                    <a href={`mailto:${deputado.email}`} className="hover:underline">
                                        {deputado.email}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`https://www.camara.leg.br/deputados/${deputado.id}`} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Ver Perfil
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
