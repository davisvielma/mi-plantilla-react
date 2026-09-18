import {
	ArrowRight,
	CheckCircle2,
	Code2,
	LayoutDashboard,
	Lock,
	Shield,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";

// import { useAuth } from "@/lib/auth";

const features = [
	{
		icon: LayoutDashboard,
		title: "Panel Listo",
		description:
			"Paneles preconstruidos para usuarios y administradores con navegación lateral y diseños adaptables.",
	},
	{
		icon: Lock,
		title: "Autenticación Segura",
		description:
			"Autenticación por correo y contraseña con control de acceso basado en roles. Roles de admin y usuario integrados.",
	},
	{
		icon: Zap,
		title: "Rápido por Defecto",
		description:
			"Impulsado por React, TanStack Query y Tailwind CSS para una experiencia de desarrollo ágil y moderna.",
	},
	{
		icon: Shield,
		title: "Tipado Seguro",
		description:
			"Soporte completo de TypeScript con tipos compartidos y verificaciones estrictas en todo el código base.",
	},
	{
		icon: Users,
		title: "Acceso Basado en Roles",
		description:
			"Panel de administración con gestión de usuarios y asignación de roles. Páginas de usuario delimitadas por acceso individual.",
	},
	{
		icon: Code2,
		title: "Arquitectura Limpia",
		description:
			"Organizado por funcionalidades con componentes reutilizables, hooks y utilidades listas para extender.",
	},
];

const pricingTiers = [
	{
		name: "Starter",
		price: "$0",
		period: "para siempre",
		description: "Perfecto para proyectos pequeños y uso personal.",
		features: [
			"Hasta 3 proyectos",
			"Analíticas básicas",
			"Soporte comunitario",
			"Temas claro y oscuro",
		],
		cta: "Empezar",
		highlight: false,
	},
	{
		name: "Pro",
		price: "$29",
		period: "por mes",
		description: "Para equipos en crecimiento que necesitan más potencia.",
		features: [
			"Proyectos ilimitados",
			"Analíticas avanzadas",
			"Soporte prioritario",
			"Dominios personalizados",
			"Colaboración en equipo",
			"Acceso a la API",
		],
		cta: "Iniciar Prueba Gratuita",
		highlight: true,
	},
	{
		name: "Enterprise",
		price: "$XXX",
		period: "contáctanos",
		description: "Para grandes organizaciones con necesidades personalizadas.",
		features: [
			"Todo lo incluido en Pro",
			"SSO y SAML",
			"Soporte dedicado",
			"Garantía de SLA",
			"Opción de despliegue local (On-premise)",
		],
		cta: "Contactar a Ventas",
		highlight: false,
	},
];

export const HomePage = () => {
	const navigate = useNavigate();
	// const { user } = useAuth();

	const goTo = (path?: "login" | "register") => {
		// if (user) {
		// 	navigate("/dashboard");
		// return;
		// }

		if (path) {
			navigate(path === "login" ? "/auth/login" : "/auth/register");
			return;
		}
	};

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10">
					<div className="absolute left-1/2 top-0 -translate-x-1/2 h-150 w-150 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute right-0 top-1/3 h-100 w-100 rounded-full bg-success/10 blur-3xl" />
				</div>

				<div className="container mx-auto px-4 py-24 md:py-32">
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground animate-fade-in">
							<Sparkles className="h-3.5 w-3.5 text-primary" />
							<span>Plantilla de React lista para producción</span>
						</div>

						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
							Crea tu próxima aplicación
							<span className="block bg-linear-to-r from-primary to-info bg-clip-text text-transparent">
								Más rápido que nunca
							</span>
						</h1>

						<p
							className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in"
							style={{ animationDelay: "0.1s" }}
						>
							Una plantilla base sólida con autenticación, paneles basados ​​en
							roles, modo oscuro y una arquitectura limpia. Deja de empezar
							desde cero.
						</p>

						<div
							className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in"
							style={{ animationDelay: "0.2s" }}
						>
							<Button
								size="lg"
								onClick={() => goTo("login")}
								className="w-full sm:w-auto"
							>
								{/* {user ? "Ir al panel de control" : "Empieza gratis"} */}
								Empieza gratis
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
							<a
								href="#features"
								aria-label="Obtén más información sobre la sección de características"
								className={buttonVariants({
									size: "lg",
									variant: "outline",
									className: "w-full sm:w-auto",
								})}
							>
								Más información
							</a>
						</div>

						<div
							className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-success" />
								No se requiere tarjeta de crédito
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-success" />
								Plan gratuito para siempre
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section
				id="features"
				className="scroll-mt-20 border-t border-border/40 py-24"
			>
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Todo lo que necesitas para empezar
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Características cuidadosamente diseñadas que cubren las
							necesidades más comunes de las aplicaciones web modernas.
						</p>
					</div>

					<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, i) => (
							<div
								key={`feacture-${String(i)}`}
								className="group relative rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg animate-fade-in"
								style={{ animationDelay: `${i * 0.05}s` }}
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section
				id="pricing"
				className="scroll-mt-20 border-t border-border/40 bg-muted/30 py-24"
			>
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Precios simples y transparentes
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Elige el plan que se ajuste a tus necesidades. Mejora o reduce tu
							plan cuando quieras.
						</p>
					</div>

					<div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
						{pricingTiers.map((tier, i) => (
							<div
								key={`tier-${String(i)}`}
								className={`relative min-w-0 rounded-2xl border p-6 transition-all md:p-8 ${
									tier.highlight
										? "border-primary shadow-xl scale-100 bg-card md:scale-105"
										: "border-border/60 bg-card hover:border-primary/30 hover:shadow-md"
								}`}
							>
								{tier.highlight && (
									<div className="absolute -top-3 left-1/2 -translate-x-1/2">
										<span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground whitespace-nowrap">
											Más Popular
										</span>
									</div>
								)}
								<h3 className="text-lg font-semibold">{tier.name}</h3>
								<div className="mt-4 flex items-baseline gap-1">
									<span className="text-4xl font-bold">{tier.price}</span>
									<span className="text-sm text-muted-foreground">
										/ {tier.period}
									</span>
								</div>
								<p className="mt-2 text-sm text-muted-foreground">
									{tier.description}
								</p>
								<ul className="mt-6 space-y-3">
									{tier.features.map((feat, j) => (
										<li
											key={`feat-${String(j)}`}
											className="flex items-center gap-2 text-sm"
										>
											<CheckCircle2 className="h-4 w-4 text-success shrink-0" />
											{feat}
										</li>
									))}
								</ul>
								<Button
									className="mt-8 w-full"
									variant={tier.highlight ? "default" : "outline"}
								>
									{tier.cta}
								</Button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section
				id="about"
				className="scroll-mt-20 border-t border-border/40 py-24"
			>
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl rounded-2xl border border-border bg-linear-to-br from-primary/10 via-card to-info/10 p-12 text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							¿Listo para empezar a crear?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Únete a miles de desarrolladores que usan nuestra plantilla para
							desplegar más rápido.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Button size="lg" onClick={() => goTo("register")}>
								{/* {user ? "Ir al panel de control" : "Crear cuenta gratis"} */}
								Crear cuenta gratis
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								onClick={() => navigate("/auth/login")}
							>
								Iniciar sesión
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
