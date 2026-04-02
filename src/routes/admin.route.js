import express from "express";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticate.middleware.js";

const adminRoute = express.Router();

adminRoute.get("/payment", authenticate, isAdmin);
export default adminRoute;
