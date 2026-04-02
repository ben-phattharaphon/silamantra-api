import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { prisma } from "../libs/prisma.js";
import { loginSchema, registerSchema } from "../validations/schema.js";
import jwt from "jsonwebtoken";

//Register
export async function registerService(data) {
  // parse (มี bcrypt → ใช้ async)
  const validated = await registerSchema.parseAsync(data);

  // check email ซ้ำ
  const existingUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existingUser) {
    throw createHttpError(409, "Email already exists"); // throw
  }

  // create user
  const newUser = await prisma.user.create({
    data: validated,
  });

  const { password, ...userData } = newUser;

  return userData;
}

//Login
export async function loginService(data) {
  try {
    // ดัก Zod
    const validated = loginSchema.parse(data);

    const foundUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!foundUser) {
      throw createHttpError(400, "Invalid email or password");
    }

    const pwOk = await bcrypt.compare(data.password, foundUser.password);

    if (!pwOk) {
      throw createHttpError(400, "Invalid email or password");
    }

    const payload = { id: foundUser.id, role: foundUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15d",
    });

    const { password, createdAt, updatedAt, ...userData } = foundUser;

    return { token, user: userData };
  } catch (err) {
    // ดึงเอาแค่ message แรกออกมาส่ง
    if (err.name === "ZodError") {
      const firstMsg = err.issues[0]?.message || "Invalid input";
      throw createHttpError(400, firstMsg); // ส่งออกไปแค่ "password is not correct"
    }

    throw err;
  }
}
