import express from "express";
import createHttpError from "http-errors";
import authRoute from "./routes/auth.route.js";
import stoneRoute from "./routes/stone.route.js";
import cors from "cors";
import wishRoute from "./routes/wishlist.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/stones", stoneRoute);
app.use("/api/wishlist", wishRoute);
app.use("/api/order", orderRoute);
// app.use("/api/admin", adminRoute);

app.use((req, res, next) => {
  return next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app;
