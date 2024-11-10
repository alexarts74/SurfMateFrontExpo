import { apiClient } from "./client";

export const sessionService = {
  async getAllSessions() {
    const response = await apiClient.get("/surfing_sessions");
    return response;
  },

  async getSessionById(id: string | number) {
    if (!id) throw new Error("ID de session non défini");

    const response = await apiClient.get(`/surfing_sessions/${id}`);
    return response;
  },
};
