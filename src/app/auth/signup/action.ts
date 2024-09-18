"use server";
import dbConnect from "@/lib/db/connection";
import { actionClient } from "@/lib/safe-action";
import { SignupSchema } from "@/lib/zod/auth";

export const SignUpAction = actionClient
  .schema(SignupSchema)
  .action(async ({ parsedInput }) => {
    await dbConnect();
    console.log(parsedInput);
  });
