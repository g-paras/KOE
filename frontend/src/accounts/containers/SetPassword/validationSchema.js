import { z } from "zod";

const validationSchema = z
  .object({
    password: z
      .string({
        required_error: "This field is required",
      })
      .min(1, "This field is required")
      .min(6, "Password must be at-least 6 characters")
      .max(16, "Password can have at most 16 characters"),
    rePassword: z
      .string({
        required_error: "This field is required",
      })
      .min(1, "This field is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export default validationSchema;
