import { apiClient } from "./client";

export const authService = {
  async signUp(userData: {
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return await apiClient.post("/api/users/sign_up", { user: userData });
  },

  async login(credentials: { email: string; password: string }) {
    return await apiClient.post("/api/users/log_in", { user: credentials });
  },
};
