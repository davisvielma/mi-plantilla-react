import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
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
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { useAuthStore } from "@/features/auth/store";
import type { LoginSchemaType } from "@/features/auth/types";

export const LoginPage = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const { login } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		const isValid = await login(data.email, data.password);

		if (isValid) {
			navigate("/");
			return;
		}
	};

	return (
		<Card className="border-border/60 shadow-lg animate-fade-in ">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Bienvenido de nuevo</CardTitle>
				<CardDescription>
					Ingresa tus credenciales para acceder a tu cuenta
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Iniciando sesión...
							</>
						) : (
							"Iniciar sesión"
						)}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground">
					¿No tienes una cuenta?{" "}
					<Link
						to="/auth/register"
						className="font-medium text-primary hover:underline"
					>
						Regístrate
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
