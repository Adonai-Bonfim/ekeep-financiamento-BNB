import { z } from "zod";


export const leadSchema = z.object({
  nome: z.string().trim().min(1).max(100),
  empresa: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().max(20).refine((value) => /^\+?[\d\s().-]+$/.test(value) && /^\d{10,15}$/.test(value.replace(/\D/g, ""))),
  cidade: z.string().trim().min(1).max(80),
  servico: z.enum(["Inventário de Imobilizado", "Inventário de Estoque", "Ainda não sei"]),
  necessidade: z.string().trim().max(1000),
  website: z.string().max(200),
});

export type LeadSubmission = z.infer<typeof leadSchema>;
