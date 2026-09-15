import { Compass, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
	const navigate = useNavigate();

	const handleButton = () => {
		navigate("/");
	};

	return (
		<main className="flex flex-col min-h-screen w-full items-center gap-2 p-4">
			<section className="ml-auto">
				<ModeToggle />
			</section>

			<section className="min-h-screen flex flex-col flex-1 w-full items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center gap-2">
						<span className="text-[120px] font-bold leading-none text-primary sm:text-[180px]">
							4
						</span>
						<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 sm:h-32 sm:w-32">
							<Compass
								className="h-10 w-10 animate-spin text-primary sm:h-16 sm:w-16"
								style={{ animationDuration: "4s" }}
							/>
						</div>
						<span className="text-[120px] font-bold leading-none text-primary sm:text-[180px]">
							4
						</span>
					</div>

					<h1 className="mt-4 text-2xl font-bold sm:text-3xl">
						Página no encontrada
					</h1>
					<p className="mt-3 max-w-md text-muted-foreground text-center">
						La página que buscas no existe.
					</p>
					<p className="max-w-md text-muted-foreground text-center">
						Volvamos a encarrilarte.
					</p>

					<Button
						className="mt-4 px-4 py-2 h-10 font-bold"
						onClick={handleButton}
					>
						<Home className="h-4 w-4" />
						Go Home
					</Button>
				</div>
			</section>
		</main>
	);
};
