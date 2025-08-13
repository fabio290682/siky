
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";

export default function ProfilePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Perfil do Usuário
                </CardTitle>
                <CardDescription>
                    Gerencie as informações da sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border">
                            <AvatarImage src="https://placehold.co/96x96.png" alt="User" data-ai-hint="avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Alterar foto</span>
                        </Button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">João da Silva</h2>
                        <p className="text-muted-foreground">joao.silva@email.com</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" defaultValue="João da Silva" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="joao.silva@email.com" />
                        </div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input id="current-password" type="password" placeholder="********" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" placeholder="********" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button>Salvar Alterações</Button>
                </div>

            </CardContent>
        </Card>
    )
}
