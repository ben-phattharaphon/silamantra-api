import express from "express";
import {
  createStoneController,
  getAllStonesController,
  getStoneByIdController,
  searchStoneController,
  updateStoneController,
} from "../controllers/stone.controller.js";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticate.middleware.js";

const stoneRoute = express.Router();

stoneRoute.get("/", getAllStonesController);

stoneRoute.get("/:id", getStoneByIdController);
stoneRoute.post("/search", searchStoneController);

//admin only !!!!
//เพิ่มข้อมูลหินในร้านค้า
stoneRoute.post("/admin", authenticate, isAdmin, createStoneController);

//อัพเดทข้อมูลหินในร้านค้า
stoneRoute.patch("/admin/:id", authenticate, isAdmin, updateStoneController);

//ลบข้อมูลหิน
stoneRoute.delete("/admin/:id", authenticate, isAdmin);
export default stoneRoute;
