import { z } from "zod";
import mongoose from "mongoose";

/*

    Cases to consider:
    1. Valid ObjectId: A valid 24-character hexadecimal string (e.g., "507f1f77bcf86cd799439011").
    2. Invalid ObjectId: A string that is not a valid ObjectId (e.g., "invalidObjectId", "12345", "507f1f77bcf86cd7994390").
    3. Empty String: An empty string should be considered invalid.
    4. Null or Undefined: Null or undefined values should be considered invalid.
    5. Non-string

*/
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

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const getHistoryEntryByIdSchema = z.object({
  entryId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message:
      "Invalid History Entry ID format. Must be a valid MongoDB ObjectId.",
  }),
});



