import { Sparkles } from "lucide-react";
import { Link } from "react-router";

interface Props {
	application: "footer" | "navbar" | "auth" | "dashboard";
}

const nameLogo = "React Starter";

export const Logo = ({ application }: Props) => {
	if (application === "footer") {
		return (
			<div className="flex items-center gap-2">
				<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
					<Sparkles className="h-4 w-4 text-primary-foreground" />
				</div>
				<span className="font-semibold">{nameLogo}</span>
			</div>
		);
	}

	if (application === "auth") {
		return (
			<Link
				to="/"
				className="relative z-10 flex items-center gap-2 text-primary-foreground"
			>
				<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
					<Sparkles className="h-5 w-5" />
				</div>
				<span className="text-xl font-bold">{nameLogo}</span>
			</Link>
		);
	}

	return (
		<Link to="/" className="flex items-center gap-2">
			<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
				<Sparkles className="h-5 w-5 text-primary-foreground" />
			</div>
			<span
				className={`${application === "navbar" ? "text-lg" : ""} font-bold`}
			>
				{nameLogo}
			</span>
		</Link>
	);
};
