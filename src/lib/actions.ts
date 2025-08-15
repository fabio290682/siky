
"use server"

import { summarizeAmendments, type SummarizeAmendmentsInput } from "@/ai/flows/summarize-amendments"
import { generateConsolidatedReport, generateConventionsReport, type ReportFilters, type ConventionFilters } from "./report-service";

export async function handleSummarize(input: SummarizeAmendmentsInput) {
  try {
    const result = await summarizeAmendments(input)
    return { success: true, summary: result.summary }
  } catch (error) {
    console.error("Error summarizing amendments:", error)
    return { success: false, error: "Não foi possível gerar o resumo. Tente novamente." }
<<<<<<< HEAD
  }
}

export async function handleGenerateReport(filters: ReportFilters) {
  try {
    const pdf = await generateConsolidatedReport(filters);
    return { success: true, pdf: pdf };
  } catch (error: any) {
    console.error("Error generating report:", error);
    return { success: false, error: error.message || "Failed to generate report." };
  }
}


export async function handleGenerateConventionsReport(filters: ConventionFilters) {
  try {
    const pdf = await generateConventionsReport(filters);
    return { success: true, pdf: pdf };
  } catch (error: any) {
    console.error("Error generating conventions report:", error);
    return { success: false, error: error.message || "Failed to generate conventions report." };
=======
>>>>>>> af96cc0 (ao colocar dados da api buscar automatico em emendas e ativar tudo)
  }
}
