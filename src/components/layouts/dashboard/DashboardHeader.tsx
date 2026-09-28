import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { ModeToggle } from "@/components/common/ModeToggle";
import { UserMenu } from "@/components/common/UserMenu";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import { getUserMenuItems } from "./dashboard-nav";

interface Props {
	onOpenSidebar: () => void;
}

export const DashboardHeader = ({ onOpenSidebar }: Props) => {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = async () => {
		await logout();
		navigate("/auth/login", { replace: true });
	};

	return (
		<header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
			<Button
				variant="ghost"
				size="icon"
				className="lg:hidden"
				onClick={onOpenSidebar}
			>
				<Menu className="h-5 w-5" />
			</Button>

			<div className="ml-auto flex items-center gap-2">
				<Button variant="ghost" size="icon" className="relative">
					<Bell className="h-4 w-4" />
					<span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
				</Button>
				<ModeToggle />
				<UserMenu
					user={user}
					items={getUserMenuItems(user)}
					onLogout={handleLogout}
				/>
			</div>
		</header>
	);
};
