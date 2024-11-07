import { API_CONFIG } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}`;
  }

  private async getHeaders() {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Token envoyé:", token); // Debug
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  async get(endpoint: string) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }

  async post(endpoint: string, data: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }
}

export const apiClient = new ApiClient();
