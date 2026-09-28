import axiosApiClient from "../../Shared/api/axiosApiClient";
import type { ApiResponse } from "../../Shared/models/ApiResponse";
import type { AuthResponse } from "../models/AuthResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import type { UserInfo } from "../../users/models/UserInfo";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../../Shared/utils/tokenStorage";

class AuthService {
  private readonly BASE = "/Auth";

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/register`,
      data,
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Registration failed");
    }

    setAccessToken(response.data.data.accessToken);
    return response.data.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/login`,
      data,
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Login failed");
    }

    setAccessToken(response.data.data.accessToken);
    return response.data.data;
  }

  async getUserInfo(): Promise<UserInfo> {
    const response = await axiosApiClient.get<ApiResponse<UserInfo>>(
      `${this.BASE}/me`,
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to fetch user info");
    }
    return response.data.data;
  }

  async logout(): Promise<void> {
    try {
      await axiosApiClient.post(`${this.BASE}/revoke`);
    } finally {
      clearAccessToken();
    }
  }
  isAuthenticated(): boolean {
    return !!getAccessToken();
  }
}
export default new AuthService();
