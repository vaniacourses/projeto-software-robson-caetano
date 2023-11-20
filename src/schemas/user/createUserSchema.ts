import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export type UserType = z.infer<typeof UserSchema>;
