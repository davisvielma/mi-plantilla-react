import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Logo";

interface Props {
	sections: { ref: string; text: string }[];
}

export const Footer = ({ sections }: Props) => {
	return (
		<footer className="border-t border-border/40 py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					<Logo application="footer" />
					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						{sections.map((section) => (
							<a
								key={`footer-${section.ref}`}
								href={`#${section.ref}`}
								className="hover:text-foreground transition-colors"
							>
								{section.text}
							</a>
						))}
					</div>
					<div className="flex items-center gap-4">
						<a
							href="https://github.com/davisvielma"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FaGithub className="h-5 w-5" />
						</a>
						<a
							href="https://x.com/davisvielma"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FaXTwitter className="h-5 w-5" />
						</a>
						<a
							href="https://linkedin.com/in/davisvielma/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FaLinkedin className="h-5 w-5" />
						</a>
					</div>
				</div>
				<div className="mt-8 text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} React Starter. Todos los derechos
					reservados.
				</div>
			</div>
		</footer>
	);
};
