import { z } from "zod";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// =========================
// REGISTER SCHEMA
// =========================
export const registerSchema = z
  .object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),

    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters"),

    password: z.coerce
      .string()
      .min(4, "Password must be at least 4 characters"),

    confirmPassword: z.coerce.string().min(1, "Please confirm your password"),

    birth_date: z.string().min(1, "Birth date is required"),
  })
  .refine(
    (data) => {
      console.log("data", data);
      console.log("PW:", data.password);
      console.log("Confirm:", data.confirmPassword);
      return data.password === data.confirmPassword;
    },
    {
      message: "confirmPassword must match password",
      path: ["confirmPassword"],
    },
  )
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
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"), //
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"), //
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
