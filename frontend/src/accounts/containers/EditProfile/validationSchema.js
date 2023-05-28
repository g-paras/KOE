import { z } from "zod";

const validationSchema = z.object({
  firstName: z
    .string({
      required_error: "This field is required",
    })
    .trim()
    .min(1, "This field is required")
    .max(55, "This field can contain 55 characters at most"),
  lastName: z
    .string({
      required_error: "This field is required",
    })
    .max(55, "This field can contain 55 characters at most")
    .trim()
    .optional(),
  username: z.string(),
  aboutMe: z
    .string()
    .trim()
    .max(255, "This field can contain 255 characters at most"),
});

export default validationSchema;
