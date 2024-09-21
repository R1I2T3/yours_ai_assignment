"use server";

import { authActionClient } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const LogoutAction = authActionClient.action(async () => {
  cookies().delete("token");
  return redirect("/auth/login");
});
