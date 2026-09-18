import { Outlet } from "react-router";
import { Logo } from "../common/Logo";
import { ModeToggle } from "../common/ModeToggle";

const AuthLayout = () => {
	return (
		<main className="flex min-h-screen">
			{/* Left panel */}
			<div className="relative hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
				<div className="absolute inset-0 bg-linear-to-br from-primary to-info opacity-90" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

				<Logo application="auth" />

				<div className="relative z-10 text-primary-foreground">
					<h1 className="text-4xl font-bold leading-tight">
						Build faster,
						<br />
						ship smarter.
					</h1>
					<p className="mt-4 max-w-md text-lg text-primary-foreground/80">
						A production-ready template with authentication, role-based
						dashboards, and a clean architecture.
					</p>
					<div className="mt-8 flex items-center gap-6">
						<div>
							<div className="text-3xl font-bold">10k+</div>
							<div className="text-sm text-primary-foreground/70">
								Developers
							</div>
						</div>
						<div className="h-10 w-px bg-white/20" />
						<div>
							<div className="text-3xl font-bold">99.9%</div>
							<div className="text-sm text-primary-foreground/70">Uptime</div>
						</div>
						<div className="h-10 w-px bg-white/20" />
						<div>
							<div className="text-3xl font-bold">24/7</div>
							<div className="text-sm text-primary-foreground/70">Support</div>
						</div>
					</div>
				</div>

				<div className="relative z-10 text-sm text-primary-foreground/70">
					© {new Date().getFullYear()} React Starter. All rights reserved.
				</div>
			</div>

			{/* Right panel */}
			<div className="flex w-full flex-col lg:w-1/2">
				<div className="flex items-center justify-between p-6">
					<div className="lg:hidden">
						<Logo application="navbar" />
					</div>
					<div className="ml-auto">
						<ModeToggle />
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center p-6">
					<div className="w-full max-w-md">
						<Outlet />
					</div>
				</div>
			</div>
		</main>
	);
};

export default AuthLayout;
