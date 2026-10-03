import { getAccessToken } from "../../Shared/utils/tokenStorage";
import axiosApiClient from "../../Shared/api/axiosApiClient";
import type { ApiResponse } from "../../Shared/models/ApiResponse";
import type { UserInfo } from "../models/UserInfo";
import type { PagedResult } from "../../Shared/models/PagedResult";

class UserService {
  private readonly BASE = "/users";

  async getAllUsers(): Promise<UserInfo[]> {
    const response = await axiosApiClient.get<
      ApiResponse<PagedResult<UserInfo>>
    >(`${this.BASE}/getAllUsers`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to fetch users");
    }
    return Array.isArray(response.data.data.items)
      ? response.data.data.items
      : [];
  }
}

export default new UserService();
