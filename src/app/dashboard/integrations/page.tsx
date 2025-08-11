import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Integrações de API
        </CardTitle>
        <CardDescription>
            Gerencie as conexões com as APIs do Transfere.gov e Portal da Transparência.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Transfere.gov</h3>
            <div className="space-y-2">
                <Label htmlFor="transferegov-url">URL da API</Label>
                <Input id="transferegov-url" placeholder="https://api.transfere.gov.br" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="transferegov-token">Token de Acesso</Label>
                <Input id="transferegov-token" type="password" placeholder="Seu token de acesso" />
            </div>
        </div>
        <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Portal da Transparência</h3>
            <div className="space-y-2">
                <Label htmlFor="transparencia-api-key">Chave da API</Label>
                <Input id="transparencia-api-key" type="password" placeholder="Sua chave da API do Portal da Transparência" />
            </div>
        </div>
        <Button>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
}
