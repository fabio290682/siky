
"use client"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getEmendaDetail, type Emenda } from "@/src/services/transparencia-api";
import { Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="grid grid-cols-2 gap-2 py-2 border-b">
        <p className="font-semibold text-sm text-muted-foreground">{label}</p>
        <p className="text-sm">{value || "Não disponível"}</p>
    </div>
)

export function AmendmentDetailDialog({ amendmentId, children }: { amendmentId: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [amendmentDetail, setAmendmentDetail] = useState<Emenda | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchDetails = async () => {
        if (!amendmentId) return;

        setIsLoading(true);
        setError(null);
        setAmendmentDetail(null);

        try {
            const details = await getEmendaDetail(amendmentId);
            if (details) {
                setAmendmentDetail(details);
            } else {
                 setError("Detalhes da emenda não encontrados.");
                 toast({
                    variant: "destructive",
                    title: "Erro ao buscar detalhes",
                    description: "Não foi possível encontrar os detalhes para a emenda selecionada.",
                });
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Erro de Rede",
                description: "Não foi possível buscar os detalhes da emenda. Verifique sua conexão.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            fetchDetails();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Detalhes da Emenda</DialogTitle>
                    <DialogDescription>
                        Informações detalhadas da emenda parlamentar recuperadas do Portal da Transparência.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-4">
                    {isLoading && (
                        <div className="flex items-center justify-center h-40">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {error && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-40 text-destructive">
                             <AlertTriangle className="h-8 w-8 mb-2" />
                            <p>{error}</p>
                        </div>
                    )}
                    {amendmentDetail && !isLoading && (
                       <div className="space-y-2">
                           <DetailItem label="Código da Emenda" value={amendmentDetail.codigo} />
                           <DetailItem label="Número da Emenda" value={amendmentDetail.numero} />
                           <DetailItem label="Ano" value={amendmentDetail.ano} />
                           <DetailItem label="Autor" value={amendmentDetail.autor} />
                           <DetailItem label="Tipo" value={amendmentDetail.tipo} />
                           <DetailItem label="Localidade" value={amendmentDetail.localidade} />
                           <DetailItem label="Função" value={amendmentDetail.funcao} />
                           <DetailItem label="Subfunção" value={amendmentDetail.subfuncao} />
                           <DetailItem label="Beneficiário" value={amendmentDetail.beneficiario} />
                           <DetailItem label="Valor Empenhado" value={amendmentDetail.valorEmpenhado} />
                           <DetailItem label="Valor Liquidado" value={amendmentDetail.valorLiquidado} />
                           <DetailItem label="Valor Pago" value={amendmentDetail.valorPago} />
                           <DetailItem label="Valor Resto a Pagar" value={amendmentDetail.valorRestoAPagar} />
                       </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
