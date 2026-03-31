◊# SILAMANTRA API Documentation

### env guide

PORT=9000  
BATABASE\*URL=\*\**  
JWT*SECERT=\*\*\*

ระบบร้านค้าออนไลน์และจัดการสต็อก "หินมงคล" ที่รองรับการเลือกชมตามความหมาย, ระบบสั่งซื้อ, การแจ้งโอนเงินด้วยสลิป และระบบหลังบ้านสำหรับผู้ดูแลระบบ

## 📑 API Documentation (API Endpoints)

**Base URL:** `http://localhost:5000/api`  
_(หมายเหตุ: ทุก Request ที่ไม่ใช่ Public ต้องแนบ `Authorization: Bearer <token>` ใน Header)_

### 🔐 1. Authentication (ระบบสมาชิก)

| Method | Endpoint         | Description                 | Access Role |
| :----- | :--------------- | :-------------------------- | :---------- |
| POST   | `/auth/register` | สมัครสมาชิกใหม่             | Public      |
| POST   | `/auth/login`    | เข้าสู่ระบบ (รับ JWT Token) | Public      |

### 💎 2. Sacred Stones (จัดการข้อมูลหินมงคล)

| Method | Endpoint      | Description                            | Access Role        |
| :----- | :------------ | :------------------------------------- | :----------------- |
| GET    | `/stones`     | ดึงข้อมูลหินมงคลทั้งหมด                | All                |
| GET    | `/stones/:id` | ดูรายละเอียดหินรายชิ้น                 | All                |
| POST   | `/stones`     | เพิ่มรายการหินมงคลใหม่                 | **System (Admin)** |
| PATCH  | `/stones/:id` | แก้ไขข้อมูลหิน (ราคา, สต็อก, คำอธิบาย) | **System (Admin)** |
| DELETE | `/stones/:id` | ลบหินออกจากระบบ                        | **System (Admin)** |

### 🛒 3. Orders (ระบบสั่งซื้อ)

| Method | Endpoint      | Description                  | Access Role        |
| :----- | :------------ | :--------------------------- | :----------------- |
| POST   | `/orders`     | สร้างออเดอร์สั่งซื้อสินค้า   | User               |
| GET    | `/orders/my`  | ดูประวัติการสั่งซื้อของตนเอง | User               |
| GET    | `/orders/:id` | ดูรายละเอียดออเดอร์รายรายการ | User / System      |
| GET    | `/orders`     | ดูรายการออเดอร์ทั้งหมดในระบบ | **System (Admin)** |

### 💳 4. Payments & Slips (การแจ้งโอนและยืนยัน)

| Method | Endpoint               | Description                                  | Access Role        |
| :----- | :--------------------- | :------------------------------------------- | :----------------- |
| POST   | `/payments`            | **แจ้งโอนเงิน:** ส่งหลักฐานสลิป (URL)        | User               |
| GET    | `/payments/:orderId`   | ดึงข้อมูลการแจ้งโอนของออเดอร์นั้นๆ           | User / System      |
| PATCH  | `/payments/:id/verify` | **ยืนยันการสั่งซื้อ:** อนุมัติหรือปฏิเสธสลิป | **System (Admin)** |

### ❤️ 5. Favorites (รายการที่ถูกใจ)

| Method | Endpoint              | Description                       | Access Role |
| :----- | :-------------------- | :-------------------------------- | :---------- |
| GET    | `/favorites`          | ดึงรายการหินมงคลที่กดถูกใจทั้งหมด | User        |
| POST   | `/favorites/:stoneId` | เพิ่มหินเข้ารายการที่ถูกใจ        | User        |
| DELETE | `/favorites/:stoneId` | ลบหินออกจากรายการที่ถูกใจ         | User        |

---

## 🛠 ตัวอย่าง Request Body ที่สำคัญ

### การแจ้งโอนเงิน (POST `/api/payments`)

```json
{
  "order_id": "ORD-12345",
  "slip_url": "https://storage.com",
  "amount_paid": 1250.00,
  "transfer_at": "2024-05-20T14:30:00Z"
}


## 🚀 ฟีเจอร์หลัก (Features)

### 👤 สำหรับลูกค้า (User)

- **Authentication:** สมัครสมาชิก และ เข้าสู่ระบบเพื่อสั่งซื้อ
- **Stone Browsing:**
  - ดึงข้อมูลหินมงคลทั้งหมดในระบบ
  - ดูรายละเอียดหินแต่ละชนิด (เช่น ชื่อหิน, ความหมาย/พลัง, ธาตุที่ถูกโฉลก)
- **Favorites (รายการที่ถูกใจ):**
  - เพิ่ม/ลบหินที่สนใจไว้ในรายการส่วนตัว
  - ดึงรายการหินมงคลที่กดถูกใจทั้งหมดมาแสดง
- **Ordering & Payment:**
  - สร้างออเดอร์สั่งซื้อหินมงคล
  - ดูประวัติการสั่งซื้อและรายละเอียดแต่ละออเดอร์
  - **แจ้งโอนเงิน (Slip Upload):** แนบหลักฐานการโอนเงินเพื่อยืนยันคำสั่งซื้อ

### 🛠 สำหรับผู้ดูแลระบบ (Admin / System Role)

- **Stone Inventory Management (CRUD):**
  - เพิ่มหินมงคลรายการใหม่ (ชื่อ, สรรพคุณ, ราคา, รูปภาพ)
  - แก้ไขข้อมูลหินที่มีอยู่ในระบบ
  - ลบหินมงคลออกจากระบบ
- **Order Supervision:**
  - ดูรายการออเดอร์ทั้งหมดในระบบจากลูกค้าทุกคน
  - **ยืนยันการสั่งซื้อ:** ตรวจสอบรูปสลิปโอนเงินและเปลี่ยนสถานะการชำระเงิน
```
