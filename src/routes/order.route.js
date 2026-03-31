import express from "express";
import upload from "../middlewares/upload.js";
import { createOrderController } from "../controllers/order.controller.js";

const orderRoute = express.Router();

orderRoute.post("/upload", upload.single("image"), createOrderController);

export default orderRoute;
