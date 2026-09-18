import { http } from "@/lib/api/http";
import type { AuthResponse, LoginFormValues } from "../types";

export const loginAction = async ({
	email,
	password,
}: LoginFormValues): Promise<AuthResponse> => {
	try {
		const data = await http.post<LoginFormValues, AuthResponse>("auth/login", {
			email,
			password,
		});

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};
