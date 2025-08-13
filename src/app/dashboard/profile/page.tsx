
'use client';

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User, Camera, Loader2 } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Por favor, insira um email válido."),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "A senha atual é necessária para definir uma nova senha.",
    path: ["currentPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;


export default function ProfilePage() {
    const { toast } = useToast();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "PAULO DANGELO DE ARAUJO",
            email: "univox@gmail.com",
            currentPassword: "",
            newPassword: "",
        }
    });

    const { isSubmitting } = form.formState;

    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(data);

        toast({
            title: "Perfil Atualizado",
            description: "Suas informações foram salvas com sucesso.",
        });
    }

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

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu Nome Completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="seu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                             <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha Atual</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
