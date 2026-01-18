import axiosApiClient from "../http/HttpClient";
import type { ApiResponse } from "../Models/ApiResponse";
import type { AuthResponse } from "../Models/AuthResponse";
import type { LoginRequest } from "../Models/LoginRequest";
import type { RegisterRequest } from "../Models/RegisterRequest";
import type { UserInfo } from "../Models/UserInfo";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils/tokenStorage";

class AuthService {
  private readonly BASE = "/Auth";

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/register`,
      data
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Registration failed");
    }

    setAccessToken(response.data.data.accessToken);
    return response.data.data;
  }

  async Login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosApiClient.post<ApiResponse<AuthResponse>>(
      `${this.BASE}/login`,
      data
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Login failed");
    }

    setAccessToken(response.data.data.accessToken);
    return response.data.data;
  }

  async getUserInfo(): Promise<UserInfo> {
    const response = await axiosApiClient.get<ApiResponse<UserInfo>>(
      `${this.BASE}/me`
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to fetch user info");
    }
    return response.data.data;
  }

  logout(): void {
    clearAccessToken();
  }
  isAuthenticated() : boolean
  {
     return !!getAccessToken();
  }
}
export default new AuthService();
