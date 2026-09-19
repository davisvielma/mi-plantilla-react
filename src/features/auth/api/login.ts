import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";
import { http } from "@/lib/api/http";
import type { AuthResponse, LoginSchemaType } from "../types";

export const loginAction = async ({
	email,
	password,
}: LoginSchemaType): Promise<AuthResponse> => {
	try {
		const data = await http.post<LoginSchemaType, AuthResponse>("auth/login", {
			email,
			password,
		});

		return data;
	} catch (error) {
		console.error(error);
		toast.error(getApiErrorMessage(error));
		throw error;
	}
};
