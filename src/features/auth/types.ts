import type z from "zod";
import type { User } from "@/types/user";
import type { loginSchema } from "./schemas/login.schema";
import type { registerSchema } from "./schemas/register.schema";

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
