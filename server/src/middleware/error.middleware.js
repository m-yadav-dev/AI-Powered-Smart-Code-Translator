import { error } from "node:console";

export const errorHandler = (err, req, res, next) => {
  console.error(
    `❌ error middleware invoked for ${req.method} ${req.originalUrl}`,
  );
  console.error(`Error: ${err.message}`);
  console.error(`Stack trace: ${err.stack}`);

  if (res && typeof res.status === "function") {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
  next(err);
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
