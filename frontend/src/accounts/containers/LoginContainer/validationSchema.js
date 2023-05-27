import { z } from "zod";

import accountsCommonConstants from "src/accounts/constants/CommonConstants";

const loginFormValidation = z.object({
  username: z
    .string()
    .min(1, "This field is required")
    .max(
      accountsCommonConstants.USERNAME_MAX_LEN,
      `This field can not exceed ${accountsCommonConstants.USERNAME_MAX_LEN}  characters`
    )
    .regex(accountsCommonConstants.USERNAME_REGEX, "Please enter valid email"),
  password: z
    .string()
    .min(1, "This field is required")
    .max(55, "This field can not exceed 55 characters"),
});

export default loginFormValidation;
