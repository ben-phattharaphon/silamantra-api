import { prisma } from "../libs/prisma.js";
export async function getWishlistByUser(userId) {
  return await prisma.wishlist.findMany({
    where: { userId: Number(userId) },
    include: {
      stone: true, // ดึงข้อมูลหิน/สินค้ามาโ
    },
  });
}

// 2. เพิ่มสินค้าลงใน Wishlist
export async function addToWishlist(userId, stoneId) {
  return await prisma.wishlist.create({
    data: {
      userId: Number(userId),
      stoneId: Number(stoneId),
    },
  });
}

// 3. ลบสินค้าออกจาก Wishlist
export async function removeFromWishlist(wishlistId) {
  return await prisma.wishlist.delete({
    where: { id: Number(wishlistId) },
  });
}
