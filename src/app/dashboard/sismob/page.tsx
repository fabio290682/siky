import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function SismobPage() {
  const sismobUrl = "https://investsuspaineis.saude.gov.br/extensions/CGIN_Painel_SISMOB/CGIN_Painel_SISMOB.html#GUIA01";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                SISMOB
            </CardTitle>
            <CardDescription>
              Painel de Monitoramento de Obras do Fundo Nacional de Saúde.
            </CardDescription>
        </div>
        <Button asChild>
            <Link href={sismobUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir em Nova Aba
            </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Nota sobre a Visualização</AlertTitle>
            <AlertDescription>
                Este painel é um recurso externo. Se ele não carregar corretamente, por favor, utilize o botão "Abrir em Nova Aba".
            </AlertDescription>
        </Alert>
        <div className="w-full h-[calc(100vh-20rem)] border rounded-lg overflow-hidden">
            <iframe
                src={sismobUrl}
                className="w-full h-full"
                title="Painel SISMOB"
            />
        </div>
      </CardContent>
    </Card>
  );
}