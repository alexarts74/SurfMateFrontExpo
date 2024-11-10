import { apiClient } from "./client";

export const sessionService = {
  async getAllSessions() {
    const response = await apiClient.get("/surfing_sessions");
    return response;
  },
};
