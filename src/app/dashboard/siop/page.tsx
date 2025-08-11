import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";

export default function SiopPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-6 w-6" />
            SIOP
        </CardTitle>
        <CardDescription>
            Página dedicada à integração e visualização de dados do SIOP.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Conteúdo do SIOP será exibido aqui.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
