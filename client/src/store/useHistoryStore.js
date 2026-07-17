import { create } from "zustand";






export const useHistoryStore = create((set) => ({
    historyEntries: [],
    isLoading: false,
    error: null, 
}))