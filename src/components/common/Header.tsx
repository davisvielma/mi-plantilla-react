import { ArrowRight, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./Logo";
import { ModeToggle } from "./ModeToggle";

interface Props {
	sections: { ref: string; text: string }[];
}

export const Header = ({ sections }: Props) => {
	const navigate = useNavigate();

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
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigate("/auth/login")}
						>
							Iniciar sesión
						</Button>
						<Button size="sm" onClick={() => navigate("/auth/register")}>
							Empezar
							<ArrowRight className="ml-1 h-4 w-4" />
						</Button>
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
							<DropdownMenuContent align="end">
								{sections.map((section) => (
									<DropdownMenuItem
										key={`menu-item-${section.ref}`}
										render={<a href={`#${section.ref}`} />}
									>
										<span>{section.text}</span>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => navigate("/auth/login")}>
									<span>Iniciar sesión</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate("/auth/register")}>
									<span>Empezar</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
};
