"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getUserByEmail, createUser } from "@/data/user";

import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, password, email } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use!" };

  await createUser({ name, email, password: hashedPassword });
  return { success: "Email sent" };
};
