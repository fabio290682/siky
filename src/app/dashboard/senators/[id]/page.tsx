import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { senators } from "@/lib/data";
import { ArrowLeft, Mail, Phone, User, ExternalLink } from "lucide-react";
import Link from "next/link";

const DetailItem = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">{children || 'Não informado'}</p>
        </div>
    </div>
);

export default async function SenatorDetailPage({ params }: { params: { id: string } }) {
    const senator = senators.find(s => s.id === params.id);

    if (!senator) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl text-muted-foreground">Senador não encontrado.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/dashboard/senators">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a lista
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Button asChild variant="outline">
                <Link href="/dashboard/senators">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para a lista
                </Link>
            </Button>
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6 space-y-0">
                    <Avatar className="h-24 w-24 border">
                        <AvatarImage src={senator.foto} alt={senator.nome} />
                        <AvatarFallback>{senator.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-3xl">{senator.nome}</CardTitle>
                        <CardDescription className="text-lg">Senador(a) da República</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{senator.partido} - {senator.uf}</Badge>
                        </div>
                    </div>
                     <Button asChild>
                        <Link href={`https://www25.senado.leg.br/web/senadores/senador/-/perfil/${senator.id}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Perfil Oficial
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                   <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Informações de Contato</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem icon={<Phone className="h-5 w-5" />} label="Telefone">
                                {senator.telefones}
                            </DetailItem>
                            <DetailItem icon={<Mail className="h-5 w-5" />} label="Email">
                                <a href={`mailto:${senator.email}`} className="hover:underline text-primary">
                                    {senator.email}
                                </a>
                            </DetailItem>
                             <DetailItem icon={<User className="h-5 w-5" />} label="Período do Mandato">
                                {senator.periodo}
                            </DetailItem>
                        </CardContent>
                   </Card>
                </CardContent>
            </Card>
        </div>
    )
}
