import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});


