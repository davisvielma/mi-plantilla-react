import { toast } from "sonner";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/api/client";
import { getApiErrorMessage } from "@/lib/api/error";
import { http } from "@/lib/api/http";
import type { User } from "@/types/user";
import type { AuthResponse } from "../types";

export const meAction = async (): Promise<AuthResponse> => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

	if (!accessToken || !refreshToken) throw new Error("Token not found");

	try {
		const user = await http.get<User>("auth/me");

		return {
			user,
			accessToken,
			refreshToken,
		};
	} catch (error) {
		console.error(error);
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);

		toast.error(getApiErrorMessage(error));

		throw new Error("Token expired or not valid", { cause: error });
	}
};
