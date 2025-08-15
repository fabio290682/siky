
'use client';

import * as React from 'react';
<<<<<<< HEAD
import { useForm, type SubmitHandler } from 'react-hook-form';
=======
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
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

=======
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileBarChart, Loader2 } from 'lucide-react';
import { generateConsolidatedReport } from '@/lib/report-service';
import { useToast } from '@/hooks/use-toast';

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2015; year--) {
    years.push(year.toString());
  }
  return years;
};

const moduleOptions = [
  { id: 'amendments', label: 'Emendas Parlamentares' },
  { id: 'conventions', label: 'Convênios' },
  { id: 'parliamentarians', label: 'Parlamentares (Deputados)' },
  { id: 'senators', label: 'Senadores' },
  { id: 'parties', label: 'Partidos' },
];

export default function ManagerialReportPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedModules, setSelectedModules] = React.useState<string[]>([]);

  const yearOptions = generateYearOptions();

  const handleGenerateReport = async () => {
    if (selectedModules.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Seleção Necessária',
        description: 'Por favor, selecione pelo menos um módulo para o relatório.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await generateConsolidatedReport(parseInt(selectedYear), selectedModules);
      toast({
        title: 'Relatório Gerado',
        description: 'O download do seu relatório em PDF foi iniciado.',
      });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Relatório',
        description:
          'Não foi possível gerar o relatório. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="h-6 w-6" />
          Relatório Gerencial
        </CardTitle>
        <CardDescription>
<<<<<<< HEAD
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
=======
          Gere e visualize relatórios gerenciais consolidados em formato PDF.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Filtros do Relatório</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year-select">Ano de Referência</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year-select">
                  <SelectValue placeholder="Selecione o Ano" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Módulos para Incluir</Label>
              <div className="space-y-2 p-3 border rounded-md">
                {moduleOptions.map((module) => (
                  <div key={module.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={module.id}
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleChange(module.id)}
                    />
                    <Label
                      htmlFor={module.id}
                      className="font-normal cursor-pointer"
                    >
                      {module.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleGenerateReport} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileBarChart className="mr-2 h-4 w-4" />
          )}
          Gerar Relatório em PDF
        </Button>
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
      </CardContent>
    </Card>
  );
}
