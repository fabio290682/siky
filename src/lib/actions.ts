"use server"

import { summarizeAmendments, type SummarizeAmendmentsInput } from "@/ai/flows/summarize-amendments"

export async function handleSummarize(input: SummarizeAmendmentsInput) {
  try {
    const result = await summarizeAmendments(input)
    return { success: true, summary: result.summary }
  } catch (error) {
    console.error("Error summarizing amendments:", error)
    return { success: false, error: "Falha ao gerar o resumo. Tente novamente." }
  }
}
