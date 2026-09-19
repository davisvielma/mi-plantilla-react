import z from "zod";

export const registerSchema = z
	.object({
		fullName: z
			.string()
			.min(1, "El nombre completo es requerido")
			.min(3, "El nombre debe tener al menos 3 caracteres"),
		email: z
			.string()
			.min(1, "El correo es requerido")
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Ingresa un correo electrónico válido",
			),
		password: z
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres"),
		confirmPassword: z.string().min(1, "Por favor confirma tu contraseña"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});
