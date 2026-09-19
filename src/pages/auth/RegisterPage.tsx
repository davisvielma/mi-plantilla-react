import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { useAuthStore } from "@/features/auth/store";
import type { RegisterSchemaType } from "@/features/auth/types";

export const RegisterPage = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { register: registerUser } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			fullName: "",
		},
	});

	const onSubmit = async (data: RegisterSchemaType) => {
		const isValid = await registerUser(
			data.email,
			data.password,
			data.fullName,
		);

		if (isValid) {
			toast.success("Su cuenta se ha creado correctamente.");
			navigate("/");
			return;
		}
	};

	return (
		<Card className="border-border/60 shadow-lg animate-fade-in ">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Crear una cuenta</CardTitle>
				<CardDescription>Ingresa tus datos para comenzar</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="fullName">Nombre completo</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="fullName"
								type="text"
								placeholder="John Doe"
								className="pl-9"
								disabled={isSubmitting}
								{...register("fullName")}
							/>
						</div>
						{errors.fullName && (
							<p className="text-xs text-destructive">
								{errors.fullName.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Correo electrónico</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="email"
								type="email"
								placeholder="nombre@ejemplo.com"
								className="pl-9"
								disabled={isSubmitting}
								{...register("email")}
							/>
						</div>
						{errors.email && (
							<p className="text-xs text-destructive">{errors.email.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								className="pl-9 pr-9"
								disabled={isSubmitting}
								{...register("password")}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={
									showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
								tabIndex={-1}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="text-xs text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirmar contraseña</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="••••••••"
								className="pl-9 pr-9"
								disabled={isSubmitting}
								{...register("confirmPassword")}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								aria-label={
									showConfirmPassword
										? "Ocultar contraseña"
										: "Mostrar contraseña"
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
								tabIndex={-1}
							>
								{showConfirmPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-xs text-destructive">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Creando cuenta...
							</>
						) : (
							"Crear cuenta"
						)}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground">
					¿Ya tienes una cuenta?{" "}
					<Link
						to="/auth/login"
						className="font-medium text-primary hover:underline"
					>
						Iniciar sesión
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
