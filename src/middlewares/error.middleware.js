export default (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token Expired",
      message: "Your session has expired. Please log in again.",
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid Token",
      message: "The provided token is invalid or malformed.",
    });
  }
  if (
    err.name === "ZodError" ||
    (err instanceof Error && err.name === "ZodError")
  ) {
    // 💡 จุดสำคัญ: ดึง message จากตัวแรกใน issues array ออกมาเป็น String
    const firstMessage = err.issues[0]?.message || "Invalid input data";

    return res.status(400).json({
      success: false,
      message: firstMessage, // ✅ ส่งอันนี้ไปให้ Toast โชว์ (เป็น String แน่นอน)
      errors: err.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  // error ทั่วไป
  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message || "Server Error!!",
  });
};
