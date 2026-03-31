import { prisma } from "../libs/prisma";

//ดึงรายการที่รอตรวจสอบ
export async function getWaitingOrdersService() {
  //ไปหา orders ที่ส่งรอ approved
  return await prisma.orders.findMany({
    where: {
      status: "WATING",
    },
    include: {
      user: {
        select: { usrername: true, email: true },
      },
      order_items: {
        include: { stone: true },
      },
    },
    orderBy: { created_at: "desc" },
  });
}

//อัปเดทสถานะการจ่ายตัง
export async function updatedOrderApproveService(orderId, isApproved) {
  return await prisma.orders.update({
    where: { id: Number(orderId) },
    data: {
      status: isApproved ? "PAID" : "CANCELLED",
    },
  });
}
