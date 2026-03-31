import express from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import {
  addWishlist,
  getWishlist,
  deleteWishlist,
} from "../controllers/wishlist.controller.js";

const wishRoute = express.Router();
wishRoute.post("/", authenticate, addWishlist);
wishRoute.get("/", authenticate, getWishlist);
wishRoute.delete("/:id", authenticate, deleteWishlist);

export default wishRoute;
