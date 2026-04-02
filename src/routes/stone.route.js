import express from "express";
import {
  createStoneController,
  deleteStoneController,
  getAllStonesController,
  getStoneByIdController,
  updateStoneController,
} from "../controllers/stone.controller.js";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticate.middleware.js";

const stoneRoute = express.Router();

stoneRoute.get("/", getAllStonesController);

stoneRoute.get("/:id", getStoneByIdController);

//admin only !!!!
//เพิ่มข้อมูลหินในร้านค้า
stoneRoute.post("/admin", authenticate, isAdmin, createStoneController);

//อัพเดทข้อมูลหินในร้านค้า
stoneRoute.patch("/admin/:id", authenticate, isAdmin, updateStoneController);

//ลบข้อมูลหิน
stoneRoute.delete("/admin/:id", authenticate, isAdmin, deleteStoneController);
export default stoneRoute;
