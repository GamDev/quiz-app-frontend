import axios from "axios";
import { getAccessToken } from "../utils/tokenStorage";

const BASE_API_URL = "http://localhost:5234/api";

const axiosApiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor (runs BEFORE every API call)
axiosApiClient.interceptors.request.use(
  (requestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosApiClient;