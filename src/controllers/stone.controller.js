import { success } from "zod";
import {
  createStoneService,
  deleteStoneService,
  getAllStonesService,
  getStoneByIdService,
  searchStoneService,
  updateStoneService,
} from "../services/stone.service.js";

//all stone datas
export async function getAllStonesController(req, res, next) {
  try {
    const stones = await getAllStonesService();

    res.json({
      success: true,
      data: stones,
    });
  } catch (err) {
    next(err);
  }
}

//get by id
export async function getStoneByIdController(req, res, next) {
  try {
    const stone = await getStoneByIdService(req.params.id);

    res.json({
      success: true,
      data: stone,
    });
  } catch (err) {
    next(err);
  }
}

//create stones
export async function createStoneController(req, res, next) {
  try {
    //สร้างตัวแปรข้อมูลที่รับมาจาก admin
    const stoneFromAdmin = req.body;
    //check validation ว่ากรอกข้อมูลสำคัญครบ กันพังก่อนถึง service
    if (
      !stoneFromAdmin.stone_name ||
      !stoneFromAdmin.price ||
      !stoneFromAdmin.category
    )
      return res.status(400).json({
        success: false,
        message: "กรุณาระบุชื่อหิน ราคา และหมวดหมู่ให้ครบถ้วน",
      });

    //รับข้อมูลที create จาก service
    const newStone = await createStoneService(stoneFromAdmin);
    res.status(201).json({
      success: ture,
      message: "เพิ่มข้อมูลหินในรับบเรียบร้อย",
      data: newStone,
    });
  } catch (error) {
    next(error);
  }
}

//update stones
export async function updateStoneController(req, res, next) {
  try {
    //รับ id จาก url
    const { id } = req.params;

    //รับข้อมูลที่ admin ส่งมา
    const dataFromAdmin = req.body;

    //ตรวจสอบว่ามี id ส่งมา
    if (!id) {
      return res
        .status(400)
        .json({ message: "กรุณาระบุ id หินที่ต้องการแก้ไข" });
    }
    //  ส่งให้ service ทำงานต่อ
    const updatedStone = await updateStoneService(id, dataFromAdmin);

    //ส่งข้อมูลที่แก้แล้ว คืนมาหน้าบ้าน
    res.status(200).json({
      success: true,
      message: "อัปเดทข้อมูลสำเร็จแล้ว",
      data: updatedStone,
    });
  } catch (error) {
    next(error);
  }
}

//delete stones
export async function deleteStoneController(req, res, next) {
  try {
    const { id } = req.params;

    //ตรวจสอบว่ามี id ส่งมาไหม
    if (!id) {
      return res
        .status(400)
        .json({ message: "กรุณาระบุ ID ของสินค้าที่ต้องการลบ" });
    }

    //ส่งให้้ service จัดการ
    const deleteStone = await deleteStoneService(id);

    //บอกหน้าบ้านว่าลบข้อมูลแล้วนะจ๊ะ
    res.status(200).json({
      success: true,
      message: `ลบสินค้า ID: ${id} เรียบร้อยแล้ว`,
    });
  } catch (error) {
    next(error);
  }
}
