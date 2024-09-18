"use server";
import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/lib/zod/auth";
import { getUserByEmailOrUserName } from "@/data-access/user.persistance";
import dbConnect from "@/lib/db/connection";
import { compare } from "bcryptjs";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export const LoginAction = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    await dbConnect();
    const user = await getUserByEmailOrUserName("", parsedInput.email);
    if (!user) {
      return { error: "Invalid Credentials" };
    }
    const isPasswordCorrect = await compare(
      parsedInput.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return { error: "Invalid Credentials" };
    }
    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "10d",
    });
    cookies().set("token", token, { maxAge: 60 * 60 * 24 * 10 });
    return redirect("/");
  });
