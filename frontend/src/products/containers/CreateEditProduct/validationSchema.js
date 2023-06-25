import { z } from "zod";

import productsCommonConstants from "src/products/constants/CommonConstants";

/**
 * Validation schema for create / edit product form
 */
const productFormValidationSchema = z.object({
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
      (val) =>
        !val ||
        val.length === 0 ||
        val[0].size <= productsCommonConstants.IMAGE_MAX_SIZE * 1024 * 1024,
      {
        message: `Image size limit exceeds(${productsCommonConstants.IMAGE_MAX_SIZE}MB max)`,
      }
    ).refine(
      (val) =>
        !val ||
        val.length === 0 ||
        val[0].name.length <= productsCommonConstants.IMAGE_FILE_NAME_SIZE,
      {
        message: `Filename must not exceed ${productsCommonConstants.IMAGE_FILE_NAME_SIZE} characters`
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

/**
 * Validation schema for product category selector
 */
const categorySelectorValidation = z.object({
  category: z.string({
    required_error: "Select a category to proceed",
  }),
});

export { productFormValidationSchema, categorySelectorValidation };
