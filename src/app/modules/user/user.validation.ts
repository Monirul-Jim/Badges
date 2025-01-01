import { z } from "zod";
import { UserStatus } from "./user.constant";
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "password can not be more than 20 character" })
    .optional(),
});
export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export default userValidationSchema;
