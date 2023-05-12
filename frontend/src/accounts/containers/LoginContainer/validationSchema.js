import { z } from "zod";

const loginFormValidation = z.object({
  username: z
    .string()
    // .required()
    .min(1, "Username is required")
    .max(10, "Username must be less than 15 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password min 8 digits"),
});

export default loginFormValidation;
