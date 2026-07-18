import { create } from "zustand";
import { axiosInstance } from "../services/api";

export const useHistoryStore = create((set, get) => ({
  historyEntries: [],
  isLoading: false,
  error: null,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalEntries: 0,
  },
  currentViewedEntry: null,

  // Fetch paginated history entries from the backend

  fetchHistoryEntries: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/history/user-history", {
        params: {
          page,
          limit,
        },
      });
      const {
        entries = [],
        totalPages = 1,
        totalEntries = 0,
        currentPage = 1,
      } = response.data?.data || {};
      set({
        historyEntries: entries,
        pagination: {
          currentPage,
          totalPages,
          totalEntries,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred while fetching history entries.";
      console.error(`Zustand History Fetch Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHistoryEntryById: async (entryId) => {
    if (!entryId) {
      set({ error: "Entry ID is required to fetch a history entry." });
      return;
    }

    set({ isLoading: true, error: null, currentViewedEntry: null });
    try {
      const response = await axiosInstance.get(
        `/history/history-entry/${entryId}`,
      );
      const entryData = response.data?.data || null;
      set({ currentViewedEntry: entryData });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred while fetching the history entry.";
      console.error(`Zustand History Entry Fetch Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteHistoryEntry: async (entryId) => {
    if (!entryId) {
      set({ error: "Entry ID is required to delete a history entry." });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(
        `/history/delete-entry/${entryId}`,
      );

      if (response.status === 200) {
        const { historyEntries, pagination } = get();
        const filteredEntries = historyEntries.filter(
          (entry) => entry._id !== entryId,
        );

        const updatedPagination = {
          ...pagination,
          totalEntries: pagination.totalEntries - 1,
        };

        set({ historyEntries: filteredEntries, pagination: updatedPagination });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the history entry.";
      console.error(`Zustand History Entry Deletion Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  clearUserHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete("/history/clear-history");
      set({
        historyEntries: [],
        pagination: { currentPage: 1, totalEntries: 0, totalPages: 1 },
        currentViewedEntry: null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while clearing the history.";
      console.error(`Zustand History Clear Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
