import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HeartPulse, CheckCircle2 } from "lucide-react";

const services = [
    { name: "API Principal", status: "Operacional" },
    { name: "Banco de Dados", status: "Operacional" },
    { name: "Serviço de Chat", status: "Operacional" },
    { name: "Portal da Transparência API", status: "Operacional" },
    { name: "Transfere.gov API", status: "Operacional" },
    { name: "Modelo de IA", status: "Operacional" },
]

export default function StatusPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6" />
            Status dos Serviços
          </CardTitle>
          <CardDescription>
            Verifique a disponibilidade e o status dos nossos sistemas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
                <p className="font-semibold text-green-800 dark:text-green-200">Todos os sistemas operacionais</p>
                <p className="text-sm text-green-600 dark:text-green-400">Nenhum problema reportado.</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Status dos Componentes</h3>
            {services.map(service => (
                 <div key={service.name} className="flex items-center justify-between">
                    <p className="text-muted-foreground">{service.name}</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">{service.status}</p>
                    </div>
                 </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
