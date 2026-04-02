import { prisma } from "../libs/prisma.js";
import createHttpError from "http-errors";
import { searchStoneSchema } from "../schemas/stone.schema.js";

//
export async function getAllStonesService() {
  return await prisma.stones.findMany({});
}

////Product Detail
export async function getStoneByIdService(id) {
  const stoneId = Number(id);

  if (!stoneId || Number.isNaN(stoneId)) {
    throw createHttpError(400, "Invalid stone id");
  }

  const stone = await prisma.stones.findUnique({
    where: { id: stoneId },
  });

  if (!stone) {
    throw createHttpError(404, "Stone not found");
  }

  return stone;
}

//crete new stones
export async function createStoneService(stoneData) {
  const {
    stone_name,
    price,
    stock_quantity,
    month,
    description,
    image_url,
    category,
    tags,
  } = stoneData;
  return await prisma.stones.create({
    data: {
      stone_name,
      price,
      stock_quantity: parseInt(stock_quantity) || 0,
      month: month,
      description: description || "",
      image_url: image_url || "default.png",
      category,
      tags: tags,
    },
  });
}

//upadte stone data by admin
export async function updateStoneService(id, stoneData) {
  //แกะข้อมูลที่เรารับมาจาก controller เพื่อจะแก้ไข
  const {
    stone_name,
    price,
    stock_quantity,
    description,
    image_url,
    category,
    tags,
  } = stoneData;

  //ให้ prisma อัปเดทข้อมูลก้แนที่มี id ตรงกันมา
  return await prisma.stones.update({
    where: {
      id: parseInt(id), //แปลงเป็นตัวเลขก่อน
    },
    data: {
      stone_name,
      price: price ? parseFloat(price) : undefined, // ถ้ามีส่งราคามาค่อยแก้ ถ้าไม่มีให้คงเดิม
      stock_quantity:
        stock_quantity !== undefined ? parseInt(stock_quantity) : undefined,
      description,
      image_url,
      category,
      tags,
    },
  });
}

//Delete Stone data
export async function deleteStoneService(id) {
  //ให้ prisma ลบข้อมูลหินของ id ที่ส่งมา
  return await prisma.stones.delete({
    where: {
      id: parseInt(id), //แปลงตัวเลขเป็น id
    },
  });
}
