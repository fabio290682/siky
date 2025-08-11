import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default function SpecialAmendmentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6" />
            Emendas Especiais
        </CardTitle>
        <CardDescription>
          Painel para visualização e gerenciamento de emendas especiais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Conteúdo de emendas especiais será exibido aqui.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
