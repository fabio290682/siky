import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getDeputadoDetalhes } from "@/services/camara-api";
import { ArrowLeft, Briefcase, Building, Cake, Mail, MapPin, Phone, User, ExternalLink } from "lucide-react";
import Link from "next/link";

const DetailItem = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-muted-foreground">{children || 'Não informado'}</p>
        </div>
    </div>
);

export default async function ParliamentarianDetailPage({ params }: { params: { id: string } }) {
    const { dados: deputado } = await getDeputadoDetalhes(parseInt(params.id));

    if (!deputado) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl text-muted-foreground">Parlamentar não encontrado.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/dashboard/parliamentarians">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a lista
                    </Link>
                </Button>
            </div>
        )
    }

    const { ultimoStatus: status } = deputado;

    return (
        <div className="space-y-6">
            <Button asChild variant="outline">
                <Link href="/dashboard/parliamentarians">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para a lista
                </Link>
            </Button>
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6 space-y-0">
                    <Avatar className="h-24 w-24 border">
                        <AvatarImage src={status.urlFoto} alt={deputado.nomeCivil} />
                        <AvatarFallback>{deputado.nomeCivil.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-3xl">{status.nomeEleitoral}</CardTitle>
                        <CardDescription className="text-lg">{deputado.nomeCivil}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{status.siglaPartido} - {status.siglaUf}</Badge>
                            <Badge variant={status.situacao === 'Exercício' ? 'default' : 'destructive'}>
                                {status.situacao}
                            </Badge>
                        </div>
                    </div>
                     <Button asChild>
                        <Link href={`https://www.camara.leg.br/deputados/${deputado.id}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Perfil Oficial
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    <Card className="col-span-1 lg:col-span-3 p-4">
                         <h3 className="font-semibold mb-4 text-lg">Informações Pessoais</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem icon={<Cake className="h-5 w-5" />} label="Nascimento">
                                {new Date(deputado.dataNascimento).toLocaleDateString('pt-BR')} em {deputado.municipioNascimento}/{deputado.ufNascimento}
                            </DetailItem>
                            <DetailItem icon={<User className="h-5 w-5" />} label="Gênero">{deputado.sexo}</DetailItem>
                            <DetailItem icon={<Briefcase className="h-5 w-5" />} label="Escolaridade">{deputado.escolaridade}</DetailItem>
                         </div>
                    </Card>
                     <Card className="col-span-1 lg:col-span-3 p-4">
                         <h3 className="font-semibold mb-4 text-lg">Gabinete</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem icon={<Building className="h-5 w-5" />} label="Localização">
                                Prédio {status.gabinete.predio}, {status.gabinete.andar}° andar, sala {status.gabinete.sala}
                            </DetailItem>
                            <DetailItem icon={<Phone className="h-5 w-5" />} label="Telefone">{status.gabinete.telefone}</DetailItem>
                            <DetailItem icon={<Mail className="h-5 w-5" />} label="Email">
                                <a href={`mailto:${status.gabinete.email}`} className="hover:underline text-primary">
                                    {status.email}
                                </a>
                            </DetailItem>
                         </div>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
