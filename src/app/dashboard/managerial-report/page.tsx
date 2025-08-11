import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileBarChart } from "lucide-react";

export default function ManagerialReportPage() {
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
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Opções de relatórios e visualizações serão exibidas aqui.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
