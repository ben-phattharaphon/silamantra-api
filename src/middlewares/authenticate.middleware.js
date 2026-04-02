import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { getUserBy } from "../services/user.service.js";

// --- Middleware 1: สำหรับเช็คว่า Login หรือยัง ---
export async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw createHttpError[401]("Unauthorized: No token provided");
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw createHttpError[401]("Unauthorized: Token format invalid");
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //  หา User ใน DB payload ต้องมี id
    const foundUser = await getUserBy("id", payload.id);
    if (!foundUser) {
      throw createHttpError[401]("Unauthorized: User not found");
    }

    //  สร้าง userData
    const { password, createdAt, updatedAt, ...userData } = foundUser;

    // 4. ฝากข้อมูลไว้ที่ req.user
    req.user = userData;

    next();
  } catch (error) {
    next(error); // ส่ง error
  }
}

// --- Middleware 2: เช็คว่าเป็น Admin (system) หรือเปล่า ---
// ใช้ต่อท้าย authenticate
export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: สำหรับแอดมินเท่านั้น" });
  }
  next();
}
