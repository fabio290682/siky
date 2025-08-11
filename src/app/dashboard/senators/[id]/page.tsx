import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getSenadorDetalhes, Mandato } from "@/services/senado-api";
import { ArrowLeft, Briefcase, Cake, Mail, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format, differenceInYears } from 'date-fns';

const DetailItem = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">{children || 'Não informado'}</p>
        </div>
    </div>
);

const MandateCard = ({ mandato }: { mandato: Mandato }) => {
    const isTitular = mandato.DescricaoParticipacao.toLowerCase().includes('titular');

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Mandato {mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura}-{mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}</CardTitle>
                <Badge variant={isTitular ? 'default' : 'secondary'} className="w-fit">{mandato.DescricaoParticipacao}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Início:</strong> {format(new Date(mandato.DataInicio), 'dd/MM/yyyy')}</p>
                <p><strong>Fim:</strong> {mandato.DataFim ? format(new Date(mandato.DataFim), 'dd/MM/yyyy') : 'Presente'}</p>
                {mandato.MandatoMotivoAfastamento && (
                    <p><strong>Motivo do Afastamento:</strong> {mandato.MandatoMotivoAfastamento}</p>
                )}
                <p><strong>UF:</strong> {mandato.UfParlamentar}</p>
            </CardContent>
        </Card>
    )
};

export default async function SenatorDetailPage({ params }: { params: { id: string } }) {
    const senatorId = params.id;
    const senatorData = await getSenadorDetalhes(senatorId);

    if (!senatorData) {
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
    
    const { Parlamentar: senator } = senatorData.DetalheParlamentar;
    const { IdentificacaoParlamentar: id, DadosBasicosParlamentar: basicData, Mandato: currentMandate, OutrosMandatos: otherMandates } = senator;
    const otherMandatesList = Array.isArray(otherMandates?.Mandato) ? otherMandates.Mandato : (otherMandates?.Mandato ? [otherMandates.Mandato] : []);


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
                        <AvatarImage src={id.UrlFotoParlamentar} alt={id.NomeCompletoParlamentar} />
                        <AvatarFallback>{id.NomeParlamentar.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-3xl">{id.NomeParlamentar}</CardTitle>
                        <CardDescription className="text-lg">{id.NomeCompletoParlamentar}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{id.SiglaPartidoParlamentar} - {id.UfParlamentar}</Badge>
                            <Badge>{currentMandate.DescricaoParticipacao}</Badge>
                        </div>
                    </div>
                     <Button asChild>
                        <Link href={id.UrlPaginaParlamentar} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Perfil Oficial
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                   <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem icon={<Cake className="h-5 w-5" />} label="Nascimento">
                                {format(new Date(basicData.DataNascimento), 'dd/MM/yyyy')} ({differenceInYears(new Date(), new Date(basicData.DataNascimento))} anos)
                            </DetailItem>
                            <DetailItem icon={<User className="h-5 w-5" />} label="Gênero">{id.SexoParlamentar}</DetailItem>
                            <DetailItem icon={<Briefcase className="h-5 w-5" />} label="Profissão">{basicData.Profissao || 'Não informada'}</DetailItem>
                            <DetailItem icon={<Mail className="h-5 w-5" />} label="Email">
                                <a href={`mailto:${id.EmailParlamentar}`} className="hover:underline text-primary">
                                    {id.EmailParlamentar}
                                </a>
                            </DetailItem>
                        </CardContent>
                   </Card>
                   <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Mandatos</CardTitle>
                            <CardDescription>Histórico de mandatos do senador.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <MandateCard mandato={currentMandate} />
                            {otherMandatesList.map(m => <MandateCard key={m.CodigoMandato} mandato={m} />)}
                        </CardContent>
                   </Card>
                </CardContent>
            </Card>
        </div>
    )
}
