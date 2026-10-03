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

  private HandleResponse<T>(
    response: ApiResponse<T>,
    fallbackErrorMessage: string,
  ) {
    if (
      !response.success ||
      response.data === undefined ||
      response.data === null
    ) {
      throw new Error(response.message || fallbackErrorMessage);
    }
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/register`,
      data,
    );

    const authData = this.HandleResponse(response.data, "Registration failed");
    setAccessToken(authData.accessToken);
    return authData;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/login`,
      data,
    );

    const authData = this.HandleResponse(response.data, "Login failed");
    setAccessToken(authData.accessToken);
    return authData;
  }

  async getUserInfo(): Promise<UserInfo> {
    const response = await axiosApiClient.get<ApiResponse<UserInfo>>(
      `${this.BASE}/me`,
    );
    const authData = this.HandleResponse(
      response.data,
      "Failed to fetch user info",
    );
    return authData;
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
