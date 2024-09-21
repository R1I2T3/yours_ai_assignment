import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";
import { getUserById } from "@/data-access/user.persistance";
import dbConnect from "./db/connection";
interface CustomJwtPayload extends JwtPayload {
  id: string;
}
export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  await dbConnect();
  const token = cookies().get("token")?.value;
  if (!token) {
    throw new Error("You are not authorized");
  }
  const decoded = decode(token) as CustomJwtPayload | null;
  if (!decoded || !decoded.id) {
    throw new Error("You are not authorized");
  }
  const currentUser = await getUserById(decoded.id);
  if (!currentUser) {
    throw new Error("You are not authorized");
  }
  return next({ ctx: { currentUser } });
});
