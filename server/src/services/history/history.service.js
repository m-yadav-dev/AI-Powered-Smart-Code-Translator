import History from "../../models/History.model";
import { createHistorySchema } from "../../validations/history.schema";
import { z } from "zod";
import { paginationSchema } from "../../validations/history.schema";
import mongoose from "mongoose";
import { da } from "zod/v4/locales";

const objectIdValidator = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val));

export const createHistoryEntry = async (data) => {
  const validateData = createHistorySchema.parse(data);

  const entry = await History.create(validateData);
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
    .select("-__v")
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
