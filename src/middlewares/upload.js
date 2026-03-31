import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // ✅ ชื่อโฟลเดอร์ที่คุณสร้างไว้
  },
  filename: (req, file, cb) => {
    // ตั้งชื่อไฟล์: วันที่ปัจจุบัน + นามสกุลไฟล์เดิม
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload; //
