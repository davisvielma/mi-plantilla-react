import { toast } from "sonner";
import { getAccessToken, getRefreshToken } from "@/lib/api/client";
import { getApiErrorMessage } from "@/lib/api/error";
import { http } from "@/lib/api/http";
import type { User } from "@/types/user";
import type { AuthResponse } from "../types";

export const getMe = async (): Promise<AuthResponse> => {
	const accessToken = getAccessToken();
	const refreshToken = getRefreshToken();

	if (!accessToken || !refreshToken) throw new Error("Token not found");

	try {
		const user = await http.get<User>("auth/me");

		return {
			user,
			accessToken: getAccessToken() ?? accessToken,
			refreshToken: getRefreshToken() ?? refreshToken,
		};
	} catch (error) {
		console.error(error);
		toast.error(getApiErrorMessage(error));
		throw new Error("Token expired or not valid", { cause: error });
	}
};
