import { z } from "zod";

export const BoardCreationSchema = z.object({
  name: z.string().min(1),
});

export const TodoCreationSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .max(50, { message: "Maximum length of description should be 50" }),
});
export type BoardCreationType = z.infer<typeof BoardCreationSchema>;
export type TodoCreationType = z.infer<typeof TodoCreationSchema>;
