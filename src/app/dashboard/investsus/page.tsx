import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function InvestSUSPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            InvestSUS
        </CardTitle>
        <CardDescription>
            Página dedicada à integração e visualização de dados do InvestSUS.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Conteúdo do InvestSUS será exibido aqui.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
