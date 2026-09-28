import { X } from "lucide-react";
import { DashboardSidebarContent } from "./DashboardSidebarContent";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const DashboardSidebar = ({ open, onOpenChange }: Props) => {
	const close = () => onOpenChange(false);

	return (
		<>
			<aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
				<DashboardSidebarContent />
			</aside>

			{open && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Cerrar menú lateral"
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						onClick={close}
					/>
					<aside className="animate-slide-in-right absolute inset-y-0 left-0 w-64 bg-sidebar">
						<button
							type="button"
							aria-label="Cerrar menú lateral"
							onClick={close}
							className="absolute right-3 top-4 z-10 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
						>
							<X className="h-5 w-5" />
						</button>
						<DashboardSidebarContent onNavigate={close} />
					</aside>
				</div>
			)}
		</>
	);
};
