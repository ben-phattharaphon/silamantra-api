import { z } from "zod";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// =========================
// REGISTER SCHEMA
// =========================
export const registerSchema = z
  .object({
    email: z.string().trim().email("Invalid email"),

    username: z.string().trim().min(2, "username is required"),

    password: z.string().min(4, "password at least 4 characters"),
    confirmPassword: z.string().min(1, "confirm password is required"),
    birth_date: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword must match password",
    path: ["confirmPassword"],
  })
  .transform(async (data) => ({
    email: data.email,
    username: data.username,
    password: await bcrypt.hash(data.password, 10),
    birth_date: new Date(data.birth_date),
  }));

// =========================
// LOGIN SCHEMA
// =========================
export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(4, "password is not correct"),
});

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
