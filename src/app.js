import express from "express";

const app = express();
app.use(express.json());

app.get("/api/auth", (req, res) => {
  res.send("auth service");
});
// app.use("/api/users", (req, res) => {
//   res.send("auth service");
// });
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

export default app;
