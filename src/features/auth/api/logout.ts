import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";
import { http } from "@/lib/api/http";

export const logoutAction = async (): Promise<{ message: string }> => {
	try {
		const data = await http.post<{ message: string }>("auth/logout");

		return data;
	} catch (error) {
		console.error(error);
		toast.error(getApiErrorMessage(error));
		throw error;
	}
};
