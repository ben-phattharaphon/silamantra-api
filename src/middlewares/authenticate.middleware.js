import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { getUserBy } from "../services/user.service.js";

// --- Middleware 1: สำหรับเช็คว่า Login หรือยัง (ทุุกคนที่ Login ต้องผ่านตัวนี้) ---
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

    // 1. Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 2. หา User ใน DB (อย่าลืมว่าใน payload ต้องมี id)
    const foundUser = await getUserBy("id", payload.id);
    if (!foundUser) {
      throw createHttpError[401]("Unauthorized: User not found");
    }

    // 3. สร้าง userData โดยตัดข้อมูลที่ไม่สำคัญออก (รวมถึง role จะติดไปใน userData ด้วย)
    const { password, createdAt, updatedAt, ...userData } = foundUser;

    // 4. ฝากข้อมูลไว้ที่ req.user
    req.user = userData;

    next();
  } catch (error) {
    next(error); // ส่ง error ไปให้ error handler
  }
}

// --- Middleware 2: สำหรับเช็คว่าเป็น Admin (system) หรือเปล่า ---
// (ตัวนี้ต้องใช้ "ต่อท้าย" authenticate เสมอ)
export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: สำหรับแอดมินเท่านั้น" });
  }
  next();
}
