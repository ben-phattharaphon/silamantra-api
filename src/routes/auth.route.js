import express from "express";
import {
  getMeController,
  loginController,
  registerController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticate.middleware.js";
const authRoute = express.Router();

authRoute.post("/register", registerController);

authRoute.post("/login", loginController);

authRoute.get("/me", authenticate, getMeController);

authRoute.patch("/me", authenticate, updateProfileController);

export default authRoute;
