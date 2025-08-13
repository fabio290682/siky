
'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Palette, Globe, Loader2 } from "lucide-react";

export default function SettingsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [settings, setSettings] = React.useState({
        theme: 'system',
        emailNotifications: true,
        pushNotifications: false,
        language: 'pt-br'
    });

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);

        toast({
            title: "Preferências Salvas",
            description: "Suas configurações foram atualizadas com sucesso.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6" />
                    Configurações
                </CardTitle>
                <CardDescription>
                    Personalize as configurações da sua conta e da aplicação.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><Palette/> Aparência</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="theme">Tema</Label>
                            <p className="text-sm text-muted-foreground">Selecione o tema visual da aplicação.</p>
                        </div>
                        <Select 
                            value={settings.theme}
                            onValueChange={(value) => setSettings(s => ({ ...s, theme: value }))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione o tema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Claro</SelectItem>
                                <SelectItem value="dark">Escuro</SelectItem>
                                <SelectItem value="system">Sistema</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <Separator />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><Bell/> Notificações</h3>
                    <div className="space-y-4 p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                             <div>
                                <Label htmlFor="email-notifications">Notificações por Email</Label>
                                <p className="text-sm text-muted-foreground">Receba emails sobre atividades importantes.</p>
                            </div>
                            <Switch 
                                id="email-notifications" 
                                checked={settings.emailNotifications}
                                onCheckedChange={(checked) => setSettings(s => ({ ...s, emailNotifications: checked }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="push-notifications">Notificações Push</Label>
                                <p className="text-sm text-muted-foreground">Receba notificações diretamente no seu dispositivo.</p>
                            </div>
                            <Switch 
                                id="push-notifications" 
                                checked={settings.pushNotifications}
                                onCheckedChange={(checked) => setSettings(s => ({ ...s, pushNotifications: checked }))}
                            />
                        </div>
                    </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                     <h3 className="text-lg font-medium flex items-center gap-2"><Globe/> Idioma e Região</h3>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="language">Idioma</Label>
                             <p className="text-sm text-muted-foreground">Selecione o idioma da interface.</p>
                        </div>
                        <Select 
                            value={settings.language}
                            onValueChange={(value) => setSettings(s => ({ ...s, language: value }))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione o idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                                <SelectItem value="en-us">English (United States)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isLoading}>
                         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar Preferências
                    </Button>
                </div>

            </CardContent>
        </Card>
    )
}
