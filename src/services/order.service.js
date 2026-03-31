import fs from "fs";
import { prisma } from "../libs/prisma.js";
import cloudinary from "../config/cloudinary.js";

export async function createOrderService(orderData) {
  const { orderItems, totalPrice, address, localFilePath, userId } = orderData;

  try {
    // 1. อัปโหลดรูปสลิปไป Cloudinary
    const uploadRes = await cloudinary.uploader.upload(localFilePath, {
      folder: "payment_slips",
    });
    const cloudinaryUrl = uploadRes.secure_url;

    // 2. ลบรูปออกจากโฟลเดอร์ uploads ในเครื่องทันที
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    // 3. บันทึกลง Database (ใช้ Nested Write เพื่อบันทึก Order + Items พร้อมกัน)
    const newOrder = await prisma.orders.create({
      data: {
        userId: parseInt(userId),
        total_price: parseFloat(totalPrice),
        address: address,
        slip_image: cloudinaryUrl,
        status: "WAITING",
        // บันทึกรายการสินค้าที่สั่งซื้อลงในตาราง Order_items
        order_items: {
          create: orderItems.map((item) => ({
            stoneId: item.id, // ID ของหิน
            quantity: item.quantity, // จำนวนที่สั่ง
            price_at_purchase: parseFloat(item.price), // บันทึกราคา ณ ตอนที่ซื้อ (กันราคาเปลี่ยนภายหลัง)
          })),
        },
      },
      // แถม: ให้มันส่งข้อมูล items กลับมาด้วยหลังจากสร้างเสร็จ
      include: {
        order_items: true,
      },
    });

    return newOrder;
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Create Order Service Error:", error);
    throw error;
  }
}
