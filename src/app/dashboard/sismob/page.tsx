import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function SismobPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            SISMOB
        </CardTitle>
        <CardDescription>
          Página dedicada à integração e visualização de dados do SISMOB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Conteúdo do SISMOB será exibido aqui.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
