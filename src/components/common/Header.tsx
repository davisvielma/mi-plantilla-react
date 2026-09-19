import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store";
import { Logo } from "./Logo";
import { ModeToggle } from "./ModeToggle";

interface Props {
	sections: { ref: string; text: string }[];
}

export const Header = ({ sections }: Props) => {
	const [lodaing, setLodaing] = useState(false);
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = async () => {
		setLodaing(true);
		await logout();
		setLodaing(false);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Logo application="navbar" />

				<nav className="hidden items-center gap-8 md:flex">
					{sections.map((section) => (
						<a
							key={`nav-${section.ref}`}
							href={`#${section.ref}`}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							{section.text}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<ModeToggle />
					<div className="hidden items-center gap-2 md:flex">
						{user ? (
							<>
								<Button
									size="sm"
									disabled={lodaing}
									onClick={() => navigate("/dashboard")}
								>
									Panel de control
								</Button>
								<Button
									variant="destructive"
									size="sm"
									disabled={lodaing}
									onClick={handleLogout}
								>
									Cerrar sesión
								</Button>
							</>
						) : (
							<>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => navigate("/auth/login")}
								>
									Iniciar sesión
								</Button>
								<Button size="sm" onClick={() => navigate("/auth/register")}>
									Regístrate
									<ArrowRight className="ml-1 h-4 w-4" />
								</Button>
							</>
						)}
					</div>
					<div className="md:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button variant="ghost" size="icon" aria-label="Abrir menú" />
								}
							>
								<Menu className="h-5 w-5" />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-40">
								{sections.map((section) => (
									<DropdownMenuItem
										key={`menu-item-${section.ref}`}
										render={<a href={`#${section.ref}`} />}
									>
										<span>{section.text}</span>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								{user ? (
									<>
										<DropdownMenuItem
											disabled={lodaing}
											onClick={() => navigate("/dashboard")}
										>
											<span>Panel de control</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											variant="destructive"
											disabled={lodaing}
											onClick={handleLogout}
										>
											<span>Cerrar sesión</span>
										</DropdownMenuItem>
									</>
								) : (
									<>
										<DropdownMenuItem onClick={() => navigate("/auth/login")}>
											<span>Iniciar sesión</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => navigate("/auth/register")}
										>
											<span>Regístrate</span>
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
};
