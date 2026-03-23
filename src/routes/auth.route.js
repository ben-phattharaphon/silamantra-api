import express from "express";
import {
  getMeController,
  loginController,
  registerController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
const authRoute = express.Router();

authRoute.post("/register", registerController);

authRoute.post("/login", loginController);

authRoute.get("/me", authenticateMiddleware, getMeController);

authRoute.patch("/me", authenticateMiddleware, updateProfileController);

export default authRoute;
