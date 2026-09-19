import axios from "axios";
import type { ApiErrorBody } from "./types";

export const getApiErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data as ApiErrorBody | undefined;

		if (data) {
			if (typeof data.message === "string") return data.message;
			if (Array.isArray(data.message)) return data.message.join(". ");
		}

		if (typeof error.message === "string") return error.message;
	}

	if (error instanceof Error) return error.message;

	return "Error inesperado";
};
