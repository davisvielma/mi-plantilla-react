import type z from "zod";
import type { User } from "@/types/user";
import type { loginSchema } from "./schemas/login.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
