import { z } from "zod";
import mongoose from "mongoose";

// check MongoDB ObjectId format, if not valid, return error message
const objectSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid MongoDB ObjectId format",
  });

export const createHistorySchema = z.object({
  userId: objectSchema,
  action: z.string().min(3, "Action must be at least 3 characters long"),
  metadata: z.object(z.any()).optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});




