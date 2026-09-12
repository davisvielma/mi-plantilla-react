import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.url("VITE_API_URL debe ser una URL válida"),
	VITE_MODE: z.string().min(1, "VITE_MODE no puede estar vacío"),
});

export const env = envSchema.parse(import.meta.env);
