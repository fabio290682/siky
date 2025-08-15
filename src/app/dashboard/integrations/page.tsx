
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
import { Network, Loader2 } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export default function IntegrationsPage() {
  const [apiKey, setApiKey] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaving(true);
    // Here you would typically save the API key to a secure backend or environment variable storage.
    // For this example, we'll just simulate a save.
    setTimeout(() => {
      console.log("API Key saved:", apiKey);
      setIsSaving(false);
      toast({
        title: "Configurações Salvas",
        description: "Sua chave de API foi salva com sucesso.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Network className="h-6 w-6" />
            Integrações de API
        </CardTitle>
        <CardDescription>
            Gerencie as conexões com as APIs externas como a do Portal da Transparência.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Portal da Transparência</h3>
            <div className="space-y-2">
                <Label htmlFor="transparencia-api-key">Chave da API</Label>
                <Input 
                  id="transparencia-api-key" 
                  type="password" 
                  placeholder="Insira sua chave da API"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)} 
                />
            </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
