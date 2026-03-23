import { z } from "zod";
import bcrypt from "bcrypt";

// =========================
// REGISTER SCHEMA
// =========================
export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),

    username: z.string().min(2, "username is required"),

    password: z.string().min(4, "password at least 4 characters"),
    confirmPassword: z.string().min(1, "confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword must match password",
    path: ["confirmPassword"],
  })
  .transform(async (data) => ({
    email: data.email,
    usernameame: data.username,
    password: await bcrypt.hash(data.password, 10),
  }));

// =========================
// LOGIN SCHEMA
// =========================
export const loginSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "password at least 4 characters"),
  })
  .transform((data) => ({
    email: data.email,
    password: data.password,
  }));

// =========================
// UPDATE PROFILE SCHEMA
// =========================
export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(2, "username must be at least 2 characters")
    .optional(),
  birth_date: z.coerce.date().optional(),
});
