import { z } from "zod";

const createProductValidation = z.object({
  category: z.object({
    value: z.string(),
    name: z.string(),
  }),
  title: z.string().min(5).max(50).trim(),
  description: z.string().min(5).max(155).trim(),
  price: z.number(),
});

const categorySelectorValidation = z.object({
  category: z.object({
    value: z.string(),
    name: z.string(),
  }),
});

export { createProductValidation, categorySelectorValidation };
