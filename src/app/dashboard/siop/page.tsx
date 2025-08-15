
"use client";

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
import { SlidersHorizontal, Plug, Loader2 } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";


export default function SiopPage() {
  const [apiUrl, setApiUrl] = React.useState("");
  const [isConnecting, setIsConnecting] = React.useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if(!apiUrl) {
       toast({
        variant: "destructive",
        title: "URL da API não informada",
        description: "Por favor, insira a URL da API do SIOP para continuar.",
      });
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Conexão Solicitada",
        description: "A integração com a API do SIOP foi iniciada.",
      });
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-6 w-6" />
            SIOP - Sistema Integrado de Planejamento e Orçamento
        </CardTitle>
        <CardDescription>
            Página dedicada à integração e visualização de dados do SIOP.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-w-xl">
          <div className="p-6 border rounded-lg bg-background">
            <div className="flex items-center gap-3 mb-4">
              <Plug className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Conectar à API do SIOP</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Para visualizar os dados do SIOP, insira a URL da API do sistema.
              Isso permitirá a sincronização e exibição dos dados orçamentários.
            </p>
            <div className="space-y-2">
              <Label htmlFor="siop-api-url">URL da API</Label>
              <Input 
                id="siop-api-url" 
                placeholder="https://api.siop.gov.br"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Conectar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
