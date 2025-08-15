
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateReport, handleGenerateConventionsReport } from '@/lib/actions';
import { FileBarChart, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type AmendmentsFormValues = {
  year: string;
  author: string;
  amendmentNumber: string;
};

type ConventionsFormValues = {
  year: string;
  status: string;
  uf: string;
  municipio: string;
}

export default function ManagerialReportPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const amendmentsForm = useForm<AmendmentsFormValues>();
  const conventionsForm = useForm<ConventionsFormValues>();

  const onAmendmentsSubmit: SubmitHandler<AmendmentsFormValues> = async (data) => {
    setIsGenerating(true);
    try {
      const result = await handleGenerateReport({
        ano: data.year ? parseInt(data.year) : undefined,
        autor: data.author,
        numeroEmenda: data.amendmentNumber,
      });

      if (result.success && result.pdf) {
        const pdfBlob = new Blob([new Uint8Array(Object.values(result.pdf))], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_emendas_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: 'Relatório Gerado',
          description: 'O download do seu relatório de emendas foi iniciado.',
        });
      } else {
        throw new Error(result.error || 'Falha ao gerar o PDF.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Relatório',
        description: error.message || 'Não foi possível gerar o relatório. Tente novamente mais tarde.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const onConventionsSubmit: SubmitHandler<ConventionsFormValues> = async (data) => {
    setIsGenerating(true);
    try {
      const result = await handleGenerateConventionsReport(data);

      if (result.success && result.pdf) {
        const pdfBlob = new Blob([new Uint8Array(Object.values(result.pdf))], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_convenios_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: 'Relatório Gerado',
          description: 'O download do seu relatório de convênios foi iniciado.',
        });
      } else {
        throw new Error(result.error || 'Falha ao gerar o PDF.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Relatório',
        description: 'Não foi possível gerar o relatório de convênios. Tente novamente mais tarde.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="h-6 w-6" />
          Relatório Gerencial
        </CardTitle>
        <CardDescription>
          Gere e visualize relatórios gerenciais consolidados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="amendments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="amendments">Relatório de Emendas</TabsTrigger>
            <TabsTrigger value="conventions">Relatório de Convênios</TabsTrigger>
          </TabsList>
          <TabsContent value="amendments">
             <Form {...amendmentsForm}>
                <form onSubmit={amendmentsForm.handleSubmit(onAmendmentsSubmit)} className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                        control={amendmentsForm.control}
                        name="year"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <FormControl>
                            <Input placeholder="Ex: 2023" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={amendmentsForm.control}
                        name="author"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Autor</FormLabel>
                            <FormControl>
                            <Input placeholder="Nome do autor" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={amendmentsForm.control}
                        name="amendmentNumber"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número da Emenda</FormLabel>
                            <FormControl>
                            <Input placeholder="Número" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>

                    <div className="flex justify-end">
                    <Button type="submit" disabled={isGenerating}>
                        {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Gerar Relatório de Emendas
                    </Button>
                    </div>
                </form>
            </Form>
          </TabsContent>
          <TabsContent value="conventions">
            <Form {...conventionsForm}>
                <form onSubmit={conventionsForm.handleSubmit(onConventionsSubmit)} className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-4 gap-6">
                    <FormField
                        control={conventionsForm.control}
                        name="year"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <FormControl>
                            <Input placeholder="Ex: 2023" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={conventionsForm.control}
                        name="status"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Situação</FormLabel>
                            <FormControl>
                            <Input placeholder="Ex: Em execução" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={conventionsForm.control}
                        name="uf"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>UF</FormLabel>
                            <FormControl>
                            <Input placeholder="Ex: SP" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={conventionsForm.control}
                        name="municipio"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Município</FormLabel>
                            <FormControl>
                            <Input placeholder="Ex: São Paulo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>

                    <div className="flex justify-end">
                    <Button type="submit" disabled={isGenerating}>
                        {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Gerar Relatório de Convênios
                    </Button>
                    </div>
                </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
