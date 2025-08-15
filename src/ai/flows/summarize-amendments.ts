// SummarizeAmendmentsWithAI
'use server';
/**
 * @fileOverview Summarizes parliamentary amendments using AI analysis of API data and message histories.
 *
 * - summarizeAmendments - A function that summarizes amendments.
 * - SummarizeAmendmentsInput - The input type for summarizeAmendments.
 * - SummarizeAmendmentsOutput - The return type for summarizeAmendments.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Emenda } from '@/services/transparencia-api';

const SummarizeAmendmentsInputSchema = z.object({
  amendments: z.array(z.any()).describe("A list of amendment objects to be summarized."),
});
export type SummarizeAmendmentsInput = z.infer<typeof SummarizeAmendmentsInputSchema>;

const SummarizeAmendmentsOutputSchema = z.object({
  summary: z
    .string()
    .describe("A concise summary of the parliamentary amendments."),
});
export type SummarizeAmendmentsOutput = z.infer<typeof SummarizeAmendmentsOutputSchema>;

export async function summarizeAmendments(input: SummarizeAmendmentsInput): Promise<SummarizeAmendmentsOutput> {
  return summarizeAmendmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAmendmentsPrompt',
  input: {schema: z.object({
    amendmentsData: z.string()
  })},
  output: {schema: SummarizeAmendmentsOutputSchema},
  prompt: `You are an AI assistant that summarizes parliamentary amendments.

  Analyze the following JSON data which contains a list of parliamentary amendments and provide a clear and concise summary. 
  Focus on the key aspects such as the total value of the amendments, the main functions/areas they are destined for, and any other relevant patterns you identify.

  Amendments Data:
  {{{amendmentsData}}}

  Summary:`,
});

const summarizeAmendmentsFlow = ai.defineFlow(
  {
    name: 'summarizeAmendmentsFlow',
    inputSchema: SummarizeAmendmentsInputSchema,
    outputSchema: SummarizeAmendmentsOutputSchema,
  },
  async ({amendments}) => {

    const amendmentsData = JSON.stringify(amendments, null, 2);

    const {output} = await prompt({amendmentsData});
    return output!;
  }
);
