import { z } from "zod";

import accountsCommonConstants from "src/accounts/constants/CommonConstants";

const loginFormValidation = z
  .object({
    firstName: z
      .string({
        required_error: "This field is required",
      })
      .trim()
      .min(1, "This field is required")
      .max(55),
    lastName: z
      .string({
        required_error: "This field is required",
      })
      .max(55)
      .trim()
      .optional(),
    username: z
      .string({
        required_error: "This field is required",
      })
      .min(1, "This field is required")
      .max(
        accountsCommonConstants.USERNAME_MAX_LEN,
        `Username must be less than ${accountsCommonConstants.USERNAME_MAX_LEN} characters`
      )
      .regex(
        accountsCommonConstants.USERNAME_REGEX,
        "Please enter valid email"
      ),
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

export default loginFormValidation;
