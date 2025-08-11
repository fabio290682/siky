"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Wand2, Loader2, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { handleSummarize } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  apiData: z.string().min(10, {
    message: "Os dados da API devem ter pelo menos 10 caracteres.",
  }),
  messageHistory: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function AmendmentSummarizer() {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiData: "",
      messageHistory: "",
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    setSummary(null)
    const result = await handleSummarize(data)
    setIsLoading(false)

    if (result.success) {
      setSummary(result.summary)
    } else {
      toast({
        variant: "destructive",
        title: "Erro na Sumarização",
        description: result.error,
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
                Forneça os dados da API e o histórico de mensagens para gerar um
                resumo conciso.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="apiData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dados da API</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cole aqui os dados de emendas parlamentares..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="messageHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Histórico de Mensagens (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cole aqui o histórico de mensagens relevante..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Gerar Resumo
              </Button>
            </CardFooter>
          </form>
        </Form>
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
