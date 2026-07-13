import * as historyService from "../services/history/history.service.js";
import { paginationQuerySchema } from "../validations/history.schema.js";
import { getHistoryEntryByIdSchema } from "../validations/history.schema.js";
export const getUserHistory = async (req, res, next) => {
  try {
    const validatedQuery = paginationQuerySchema.safeParse(req.query);

    if (!validatedQuery.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        errors: validatedQuery.error.errors.map((err) => err.message),
      });
    }

    const { page, limit } = validatedQuery.data;

    const result = await historyService.getUserHistory(
      req.user._id,
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoryEntryById = async (req, res, next) => {
  try {
    const validatedParams = getHistoryEntryByIdSchema.safeParse(req.params);

    if (!validatedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid history entry ID",
        errors: validatedParams.error.errors.map((err) => err.message),
      });
    }

    const { entryId } = validatedParams.data;

    const userId = req.user._id;

    const entry = await historyService.getHistoryEntryById(entryId, userId);

    return res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryEntry = async (req, res, next) => {
  try {
    const validatedParams = getHistoryEntryByIdSchema.safeParse(req.params);

    if (!validatedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid history entry ID",
        errors: validatedParams.error.errors.map((err) => err.message),
      });
    }

    const { entryId } = validatedParams.data;
    const userId = req.user._id;

    const deletedEntry = await historyService.deleteHistoryEntry(
      entryId,
      userId,
    );

    return res.status(200).json({
      success: true,
      message: "History entry deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const clearUserHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await historyService.clearUserHistory(userId);

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} history entries deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(error);
  }
};
