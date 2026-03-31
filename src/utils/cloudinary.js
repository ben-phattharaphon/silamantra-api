import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // ใช้สำหรับลบไฟล์ในเครื่องหลังอัปโหลดเสร็จ

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    // 1. อัปโหลดไฟล์จาก path ในเครื่องไปที่ Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "payment_slips",
    });

    // 2. ลบไฟล์ออกจากโฟลเดอร์ uploads ในเครื่องทันที
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // 3. ส่ง URL ที่ได้กลับไป (เอาไปเก็บใน DB)
    return result.secure_url;
  } catch (error) {
    // ถ้าพลาด ก็ลบไฟล์ทิ้งด้วยเพื่อไม่ให้ขยะเต็มเครื่อง
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    throw error;
  }
};
