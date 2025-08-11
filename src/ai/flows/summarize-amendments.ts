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

const SummarizeAmendmentsInputSchema = z.object({
  apiData: z
    .string()
    .describe("Details retrieved from API integrations, such as convention and parliamentary amendment data from the Transparency Portal."),
  messageHistory: z
    .string()
    .describe("A summary of relevant message histories."),
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
  input: {schema: SummarizeAmendmentsInputSchema},
  output: {schema: SummarizeAmendmentsOutputSchema},
  prompt: `You are an AI assistant that summarizes parliamentary amendments.

  Analyze the following data retrieved from API integrations and message histories to provide a clear and concise summary of the amendments.

  API Data: {{{apiData}}}
  Message History: {{{messageHistory}}}

  Summary:`,
});

const summarizeAmendmentsFlow = ai.defineFlow(
  {
    name: 'summarizeAmendmentsFlow',
    inputSchema: SummarizeAmendmentsInputSchema,
    outputSchema: SummarizeAmendmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
