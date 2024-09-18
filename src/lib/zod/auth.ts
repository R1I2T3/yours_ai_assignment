import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Minimum length of password must be 6" }),
});

export const SignupSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Minimum length of username should be 6" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Minimum length of password must be 6" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type SignupType = z.infer<typeof SignupSchema>;
