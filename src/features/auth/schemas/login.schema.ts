import z from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "El correo es requerido")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Ingresa un correo electrónico válido",
		),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
