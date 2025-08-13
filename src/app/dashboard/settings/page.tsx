
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
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
                        <Select defaultValue="system">
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
                            <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="push-notifications">Notificações Push</Label>
                                <p className="text-sm text-muted-foreground">Receba notificações diretamente no seu dispositivo.</p>
                            </div>
                            <Switch id="push-notifications" />
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
                        <Select defaultValue="pt-br">
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
                    <Button>Salvar Preferências</Button>
                </div>

            </CardContent>
        </Card>
    )
}
