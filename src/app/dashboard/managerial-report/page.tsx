
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="h-6 w-6" />
          Relatório Gerencial
        </CardTitle>
        <CardDescription>
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
      </CardContent>
    </Card>
  );
}
