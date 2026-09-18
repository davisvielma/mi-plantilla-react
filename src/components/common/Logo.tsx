import { Sparkles } from "lucide-react";

interface Props {
	application: "footer" | "navbar" | "auth";
}

export const Logo = ({ application }: Props) => {
	if (application === "auth") {
		return (
			<div className="relative z-10 flex items-center gap-2 text-primary-foreground">
				<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
					<Sparkles className="h-5 w-5" />
				</div>
				<span className="text-xl font-bold">React Starter</span>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<div
				className={`flex ${application === "navbar" ? "h-8 w-8" : "h-7 w-7"} items-center justify-center rounded-lg bg-primary`}
			>
				<Sparkles
					className={`${application === "navbar" ? "h-5 w-5" : "h-4 w-4"} text-primary-foreground`}
				/>
			</div>
			<span
				className={`${application === "navbar" ? "text-lg font-bold" : "font-semibold"}`}
			>
				React Starter
			</span>
		</div>
	);
};
