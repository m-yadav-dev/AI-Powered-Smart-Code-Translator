import rateLimit from "express-rate-limit";

// Shared rate limit configuration for all routes
const baseRateLimitConfig = {
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

// Auth routes rate limiter

export const authRateLimiter = rateLimit({
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message:
      "Too many authentication attempts from this IP, please try again after 15 minutes.",
  },
});




// API routes rate limiter
export const apiRateLimiter = rateLimit({
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 20 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});
