import { z } from "zod";

const createProductValidation = z.object({
  category: z.string(),
  title: z
    .string()
    .trim()
    .min(1, {
      message: "This field is required",
    })
    .max(55, "This field must contain at most 55 characters"),
  description: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .max(255, "This field must contain at most 255 characters")
    .trim(),
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
  image: z
    .any()
    .refine(
      (val) => !val || val.length === 0 || val[0].size < 1 * 1024 * 1024,
      {
        message: "Image size limit exceeds(1MB max)",
      }
    ),
  "image-url": z
    .string({
      invalid_type_error: "This field is required",
      required_error: "This field is required",
    })
    .min(1, {
      message: "This field is required",
    }),
});

const categorySelectorValidation = z.object({
  category: z.string({
    required_error: "Select a category to proceed",
  }),
});

export { createProductValidation, categorySelectorValidation };
