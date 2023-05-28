import { z } from "zod";

/**
 * Validation schema for create / edit product form
 */
const validationSchema = z.object({
  price: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val)), {
      message: "This field is required",
    })
    .refine((val) => val >= 10, {
      message: "Price must be at least 10 rupee",
    })
    .refine((val) => val <= 10000, {
      message: "Price can not exceed 10000 rupee",
    }),
});


export { validationSchema };
