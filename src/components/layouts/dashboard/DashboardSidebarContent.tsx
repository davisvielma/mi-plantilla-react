import { Link, useLocation } from "react-router";
import { Logo } from "@/components/common/Logo";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/features/auth/store";
import { fullNameFormat } from "@/lib/user-formatter";
import { cn } from "@/lib/utils";
import { getNavSections } from "./dashboard-nav";

interface Props {
	onNavigate?: () => void;
}

export const DashboardSidebarContent = ({ onNavigate }: Props) => {
	const { pathname } = useLocation();
	const { user } = useAuthStore();

	return (
		<div className="flex h-full flex-col">
			<div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
				<Logo application="dashboard" />
			</div>

			<nav className="flex-1 space-y-6 overflow-y-auto p-4">
				{getNavSections(user).map((section) => (
					<div key={section.title}>
						<h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							{section.title}
						</h3>
						<div className="space-y-1">
							{section.items.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										to={item.href}
										onClick={onNavigate}
										aria-current={isActive ? "page" : undefined}
										className={cn(
											"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
											isActive
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-sidebar-foreground/70 hover:bg-accent hover:text-sidebar-foreground",
										)}
									>
										<item.icon className="h-4 w-4 shrink-0" />
										{item.label}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>

			<div className="border-t border-sidebar-border p-4">
				<div className="flex items-center gap-3 rounded-lg px-3 py-2">
					<UserAvatar user={user} />
					<div className="flex flex-1 flex-col overflow-hidden">
						<span className="truncate text-sm font-medium">
							{fullNameFormat(user)}
						</span>
						<div className="flex items-center gap-1.5">
							<Badge
								variant="default"
								className="h-4 bg-warning px-1.5 text-[10px] font-semibold text-warning-foreground"
							>
								{user?.role.name.toUpperCase() || "USER"}
							</Badge>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
