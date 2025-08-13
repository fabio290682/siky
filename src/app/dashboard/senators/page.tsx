
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
import { getSenadores, type Senator } from "@/services/senado-api";
import { Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function SenatorsPage() {
    const senadores = await getSenadores();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Senadores
                </CardTitle>
                <CardDescription>
                    Lista de senadores em exercício.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Senador</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Partido</TableHead>
                            <TableHead>UF</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Detalhes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {senadores && senadores.length > 0 ? (
                            senadores.map((senador) => (
                                <TableRow key={senador.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={senador.foto} alt={senador.nome} />
                                            <AvatarFallback>{senador.nome.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{senador.nome}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{senador.partido}</Badge>
                                    </TableCell>
                                    <TableCell>{senador.uf}</TableCell>
                                    <TableCell>
                                        <a href={`mailto:${senador.email}`} className="hover:underline">
                                            {senador.email || 'N/A'}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/dashboard/senators/${senador.id}`}>
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Ver Perfil
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
