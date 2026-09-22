import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";
import { http } from "@/lib/api/http";
import type { AuthResponse, RegisterSchemaType } from "../types";

type RegisterFromValue = Omit<RegisterSchemaType, "confirmPassword">;

export const register = async ({
	email,
	password,
	fullName,
}: RegisterFromValue): Promise<AuthResponse> => {
	try {
		const data = await http.post<RegisterFromValue, AuthResponse>(
			"auth/register",
			{
				email,
				password,
				fullName,
			},
		);

		return data;
	} catch (error) {
		console.error(error);
		toast.error(getApiErrorMessage(error));
		throw error;
	}
};
