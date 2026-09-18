import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/lib/api/types";
import { env } from "@/lib/env";

export const ACCESS_TOKEN_KEY = "access-token";
export const REFRESH_TOKEN_KEY = "refresh-token";

export const apiClient = axios.create({
	baseURL: env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
});

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setSession = (accessToken: string, refreshToken: string) => {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearSession = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
};

apiClient.interceptors.request.use((config) => {
	const token = getAccessToken();

	if (token) config.headers.Authorization = `Bearer ${token}`;

	return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
	const refreshToken = getRefreshToken();

	if (!refreshToken) throw new Error("No hay refresh token");

	const { data } = await axios.post<
		ApiResponse<{ accessToken: string; refreshToken: string }>
	>(`${env.VITE_API_URL}/auth/refresh`, { refreshToken });

	setSession(data.data.accessToken, data.data.refreshToken);
}

function singleFlightRefresh() {
	refreshPromise ??= refreshAccessToken().finally(() => {
		refreshPromise = null;
	});
	return refreshPromise;
}

apiClient.interceptors.response.use(
	(res) => res,
	async (error: AxiosError) => {
		const { config, response } = error;
		const status = response?.status;

		const isLoginRequest =
			config?.method === "post" && config.url?.includes("auth/login");

		if (
			status === 401 &&
			config &&
			!(config as RetryConfig)._retry &&
			!isLoginRequest
		) {
			if (getRefreshToken()) {
				try {
					await singleFlightRefresh();
					config.headers.Authorization = `Bearer ${getAccessToken()}`;
					(config as RetryConfig)._retry = true;
					return apiClient(config);
				} catch {
					clearSession();
					window.location.assign("/auth/login");
				}
			} else {
				clearSession();
				window.location.assign("/auth/login");
			}
		}

		return Promise.reject(error);
	},
);
