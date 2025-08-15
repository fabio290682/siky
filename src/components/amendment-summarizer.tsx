"use client"

import { useState, useEffect } from "react"
import { Wand2, Loader2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { handleSummarize } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Emenda } from "@/services/transparencia-api"

type AmendmentSummarizerProps = {
  amendments: Emenda[];
  year: string;
  isLoadingAmendments: boolean;
}

export function AmendmentSummarizer({ amendments, year, isLoadingAmendments }: AmendmentSummarizerProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Reset summary when amendments change
    setSummary(null)
  }, [amendments])

  const handleGenerateSummary = async () => {
    if (amendments.length === 0) {
      toast({
        variant: "destructive",
        title: "Dados Insuficientes",
        description: "Não há emendas para sumarizar.",
      })
      return
    }

    setIsSummarizing(true)
    setSummary(null)
    
    const result = await handleSummarize({ amendments })
    
    setIsSummarizing(false)

    if (result.success) {
      setSummary(result.summary)
    } else {
      toast({
        variant: "destructive",
        title: "Erro na Sumarização",
        description: result.error || "Não foi possível gerar o resumo. Tente novamente.",
      })
    }
  }

  return (
    <div className="mb-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Sumarizador de Emendas com IA</CardTitle>
              <CardDescription>
                Resumo gerado por IA com base nas emendas de {year} listadas abaixo.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingAmendments ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Aguardando dados das emendas...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary"/>
                <p>{amendments.length} emendas carregadas para o ano de {year}.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateSummary} 
            disabled={isSummarizing || isLoadingAmendments || amendments.length === 0}
          >
            {isSummarizing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Gerar Resumo
          </Button>
        </CardFooter>
      </Card>

      {summary && (
        <Alert className="mt-6 bg-accent/50 border-accent">
          <Wand2 className="h-4 w-4 !text-accent-foreground" />
          <AlertTitle className="text-accent-foreground">Resumo Gerado por IA</AlertTitle>
          <AlertDescription className="text-accent-foreground/90">
            {summary}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
