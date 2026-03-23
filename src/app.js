import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);

// app.use("/api/stones", (req, res) => {
//   res.send("auth service");
// });
// app.use("/api/orders", (req, res) => {
//   res.send("auth service");
// });
// app.use("/api/payments", (req, res) => {
//   res.send("auth service");
// });
// app.use("/api/chat", (req, res) => {
//   res.send("auth service");
// });
// app.use("/api/history", (req, res) => {
//   res.send("auth service");
// });

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
