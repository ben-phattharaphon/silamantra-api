// import { prisma } from "../libs/prisma";
import {
  getWaitingOrdersService,
  updatedOrderApproveService,
} from "../services/admin.service.js";

export async function getWaitingOrderController(req, res, next) {
  try {
    const orders = await getWaitingOrdersService();
    resizeBy.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function approveOrderController(req, res, next) {
  try {
    const { orderId } = req.params;
    const { isApproved, note } = req.body;

    const result = await updatedOrderApproveService(orderId, isApproved, note);

    res.status(200).json({
      success: true,
      message: `Order #${orderId} has been ${isApproved ? "approved" : "rejected"}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
