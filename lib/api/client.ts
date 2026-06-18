import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import { env } from "@/config/env";
import { ApiError, type ApiEnvelope } from "@/types/api";
import { tokenStorage } from "@/lib/api/tokenStorage";

/**
 * Callback invoked whenever the server rejects us with a 401. AuthProvider
 * registers this so a stale/expired token gets cleared and the user is bounced
 * to login — without the API layer importing React.
 */
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Attach the bearer token to every request when present.
axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// Normalise every backend error into an ApiError with a safe message.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiEnvelope<unknown>>) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ??
      (status === 0
        ? "Can't reach the server. Check your connection and try again."
        : "Something went wrong. Please try again.");
    const data = error.response?.data?.data ?? null;

    if (status === 401) onUnauthorized?.();

    return Promise.reject(new ApiError(message, status, data));
  },
);

/**
 * Thin wrapper that unwraps the `{ status, message, data }` envelope and
 * returns just `data`, typed. Use this everywhere instead of axios directly.
 */
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.request<ApiEnvelope<T>>(config);
  return response.data.data;
}

export const apiClient = {
  raw: axiosInstance,

  get<T>(url: string, config?: AxiosRequestConfig) {
    return request<T>({ ...config, method: "GET", url });
  },
  post<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return request<T>({ ...config, method: "POST", url, data: body });
  },
  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return request<T>({ ...config, method: "PUT", url, data: body });
  },
  patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return request<T>({ ...config, method: "PATCH", url, data: body });
  },
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return request<T>({ ...config, method: "DELETE", url });
  },
};
