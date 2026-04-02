import express from "express";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticate.middleware.js";
import {
  approveOrderController,
  getWaitingOrderController,
} from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.get("/payment", authenticate, isAdmin, getWaitingOrderController);
adminRoute.get("/payment", authenticate, isAdmin, approveOrderController);
export default adminRoute;
