import { z } from "zod";

import accountsCommonConstants from "src/accounts/constants/CommonConstants";

const validationSchema = z.object({
  username: z
    .string({
      required_error: "This field is required",
    })
    .min(1, "This field is required")
    .max(
      accountsCommonConstants.USERNAME_MAX_LEN,
      `Username must be less than ${accountsCommonConstants.USERNAME_MAX_LEN} characters`
    )
    .regex(accountsCommonConstants.USERNAME_REGEX, "Please enter valid email"),
});

export default validationSchema;
