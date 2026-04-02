import { createOrderService } from "../services/order.service.js";

export const createOrderController = async (req, res, next) => {
  try {
    const { orderItems, totalPrice, address, userId } = req.body;

    // 1. เช็คว่า Multer รับรูปมาวางในเครื่องหรือยัง
    const localFilePath = req.file ? req.file.path : null;

    if (!localFilePath) {
      return res.status(400).json({ message: "Please upload payment slip" });
    }

    // --- จุดที่ต้องแก้เพิ่ม: แปลง orderItems จาก String กลับเป็น Array ---
    // เนื่องจากส่งผ่าน FormData ข้อมูลจะเป็น String ต้อง JSON.parse ก่อน
    let parsedOrderItems;
    try {
      parsedOrderItems =
        typeof orderItems === "string" ? JSON.parse(orderItems) : orderItems;
    } catch (e) {
      return res.status(400).json({ message: "Invalid order items format" });
    }
    // -----------------------------------------------------------

    // 2. เรียกใช้ Service โดยส่ง parsedOrderItems ที่เป็น Array ไปแทน
    const result = await createOrderService({
      userId,
      orderItems: parsedOrderItems, // ใช้ตัวที่แปลงแล้ว
      totalPrice,
      address,
      localFilePath, // ส่ง path ไปที่ service
    });

    res.status(201).json({
      success: true,
      message: "Order created and slip uploaded to Cloudinary ✨",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
