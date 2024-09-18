"use server";
import dbConnect from "@/lib/db/connection";
import { actionClient } from "@/lib/safe-action";
import { SignupSchema } from "@/lib/zod/auth";
import {
  getUserByEmailOrUserName,
  createUser,
} from "@/data-access/user.persistance";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const SignUpAction = actionClient
  .schema(SignupSchema)
  .action(async ({ parsedInput }) => {
    await dbConnect();
    const isUserPresent = await getUserByEmailOrUserName(
      parsedInput.username,
      parsedInput.email
    );
    if (isUserPresent) {
      return { error: "Username or email is already in use" };
    }
    const hashedPassword = await hash(parsedInput.password, 10);
    const user = await createUser({
      username: parsedInput.username,
      email: parsedInput.email,
      password: hashedPassword,
    } as const);
    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "10d",
    });
    cookies().set("token", token, { maxAge: 60 * 60 * 24 * 10 });
    return redirect("/");
  });
