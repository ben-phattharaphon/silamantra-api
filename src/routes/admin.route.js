import express from "express";

const adminRoute = express.Router();

adminRoute.get("/", (req, res) => {
  res.json("admin kub");
});

export default adminRoute;
