import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Briefcase, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvestSUSPage() {
  const investsusUrl = "https://investsuspaineis.saude.gov.br/extensions/CGIN_InvestsusPaineis/CGIN_InvestsusPaineis.html";
  const repassesUrl = "https://investsuspaineis.saude.gov.br/extensions/CGIN_Painel_FAF/CGIN_Painel_FAF.html";


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6" />
                    Painel InvestSUS
                </CardTitle>
                <CardDescription>
                    Visualização dos painéis de dados do sistema InvestSUS do Ministério da Saúde.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href={repassesUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Repasses
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Nota sobre a Integração</AlertTitle>
            <AlertDescription>
              A visualização abaixo é carregada a partir de um serviço externo. A funcionalidade total e a disponibilidade de dados dependem do sistema de origem.
            </AlertDescription>
          </Alert>

          <div className="mt-6 w-full h-[70vh] border rounded-lg overflow-hidden">
            <iframe
              src={investsusUrl}
              title="Painel InvestSUS"
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
