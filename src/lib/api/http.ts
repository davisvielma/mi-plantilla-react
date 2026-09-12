import { apiClient } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/api/types";

export const http = {
	get: async <T>(url: string, { signal }: { signal?: AbortSignal } = {}) => {
		const res = await apiClient.get<ApiResponse<T>>(url, { signal });
		return res.data.data;
	},
	post: async <TBody, TResponse = TBody>(
		url: string,
		body: TBody,
		opts?: { signal?: AbortSignal },
	) => {
		const res = await apiClient.post<ApiResponse<TResponse>>(url, body, opts);
		return res.data.data;
	},
	patch: async <TBody, TResponse = TBody>(
		url: string,
		body: TBody,
		opts?: { signal?: AbortSignal },
	) => {
		const res = await apiClient.patch<ApiResponse<TResponse>>(url, body, opts);
		return res.data.data;
	},
	put: async <TBody, TResponse = TBody>(
		url: string,
		body: TBody,
		opts?: { signal?: AbortSignal },
	) => {
		const res = await apiClient.put<ApiResponse<TResponse>>(url, body, opts);
		return res.data.data;
	},
	delete: async <T>(url: string, opts?: { signal?: AbortSignal }) => {
		const res = await apiClient.delete<ApiResponse<T>>(url, opts);
		return res.data.data;
	},
};
