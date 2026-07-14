import History from "../../models/History.model.js";
import { createHistorySchema } from "../../validations/history.schema.js";
import { z } from "zod";
import { paginationSchema } from "../../validations/history.schema.js";
import mongoose from "mongoose";

const objectIdValidator = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val));

export const createHistoryEntry = async (data) => {
  const validateData = createHistorySchema.safeParse(data);
  console.log("Validated data:", validateData);
  if (!validateData.success) {
    const errorDetails = validateData.error.errors.map((err) => err.message);
    throw new Error(`Validation failed: ${errorDetails.join(", ")}`);
  }
  

  const entry = await History.create(validateData.data);
  return entry;
};

export const getUserHistory = async (userId, page = 1, limit = 10) => {
  const validUserId = objectIdValidator.parse(userId);
  const pagination = paginationSchema.parse({ page, limit });
  const skip = (pagination.page - 1) * pagination.limit;

  const [entries, totalEntries] = await Promise.all([
    History.find({ userId: validUserId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .select("-__v")
      .lean(),
    History.countDocuments({ userId: validUserId }),
  ]);

  return {
    entries,
    totalEntries,
    totalPages: Math.ceil(totalEntries / pagination.limit),
    currentPage: pagination.page,
  };
};

export const getHistoryEntryById = async (entryId, userId) => {
  const entry = await History.findOne({ _id: entryId, userId })
    .select("-__v") // __v is a version key added by Mongoose, which is not needed in the response
    .lean();

  if (!entry) {
    throw new Error("History entry not found or does not belong to the user.");
  }

  return entry;
};

export const deleteHistoryEntry = async (entryId, userId) => {
  const entry = await History.findOneAndDelete({ _id: entryId, userId });
  if (!entry) {
    throw new Error("History entry not found or does not belong to the user.");
  }
  return entry; // Returns the deleted entry or null if not found
};

export const clearUserHistory = async (userId) => {
  const result = await History.deleteMany({ userId });
  return { deletedCount: result.deletedCount }; // Returns the number of deleted entries
};
