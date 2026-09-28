import {
	Bell,
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Menu,
	Search,
	Settings,
	Shield,
	Sparkles,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../common/ModeToggle";

interface NavItem {
	label: string;
	href: string;
	icon: typeof LayoutDashboard;
}

interface NavSection {
	title: string;
	items: NavItem[];
}

const userNavSections: NavSection[] = [
	{
		title: "Main",
		items: [
			{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
			{ label: "Settings", href: "/dashboard/settings", icon: Settings },
		],
	},
];

const adminNavSections: NavSection[] = [
	{
		title: "Main",
		items: [
			{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
			{ label: "Settings", href: "/dashboard/settings", icon: Settings },
		],
	},
	{
		title: "Administration",
		items: [
			{ label: "Admin Overview", href: "/dashboard/admin", icon: Shield },
			{ label: "User Management", href: "/dashboard/admin/users", icon: Users },
		],
	},
];

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { user, logout, isAdmin } = useAuthStore();

	const navSections = isAdmin() ? adminNavSections : userNavSections;

	const initials = (user?.fullName || user?.email || "U")
		.split(" ")
		.map((s) => s[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const handleLogout = async () => {
		await logout();
		navigate("/auth/login", { replace: true });
	};

	const SidebarContent = () => (
		<div className="flex h-full flex-col">
			<div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<Sparkles className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="font-bold">React Starter</span>
				</Link>
			</div>

			<nav className="flex-1 overflow-y-auto p-4 space-y-6">
				{navSections.map((section) => (
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
										onClick={() => setSidebarOpen(false)}
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
					<Avatar className="h-8 w-8">
						<AvatarImage
							// src={profile?.avatar_url || undefined}
							alt={user?.fullName || ""}
						/>
						<AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col overflow-hidden">
						<span className="truncate text-sm font-medium">
							{user?.fullName || "User"}
						</span>
						<div className="flex items-center gap-1.5">
							{isAdmin() ? (
								<Badge
									variant="default"
									className="h-4 px-1.5 text-[10px] font-semibold bg-warning text-warning-foreground"
								>
									<Shield className="mr-0.5 h-2.5 w-2.5" />
									ADMIN
								</Badge>
							) : (
								<span className="truncate text-xs text-muted-foreground">
									Standard User
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-background">
			{/* Desktop sidebar */}
			<aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
				<SidebarContent />
			</aside>

			{/* Mobile sidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Close sidebar"
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						onClick={() => setSidebarOpen(false)}
					/>
					<aside className="absolute inset-y-0 left-0 w-64 bg-sidebar animate-slide-in-right">
						<button
							type="button"
							onClick={() => setSidebarOpen(false)}
							className="absolute right-3 top-4 z-10 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
						>
							<X className="h-5 w-5" />
						</button>
						<SidebarContent />
					</aside>
				</div>
			)}

			{/* Main content */}
			<div className="lg:pl-64">
				{/* Navbar */}
				<header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu className="h-5 w-5" />
					</Button>

					{/* Search */}
					<div className="relative hidden flex-1 md:block max-w-md">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full rounded-lg border border-input bg-muted/50 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:bg-background"
						/>
					</div>

					<div className="ml-auto flex items-center gap-2">
						{isAdmin() && (
							<Badge
								variant="default"
								className="hidden sm:inline-flex bg-warning text-warning-foreground"
							>
								<Shield className="mr-1 h-3 w-3" />
								Admin Mode
							</Badge>
						)}
						<Button variant="ghost" size="icon" className="relative">
							<Bell className="h-4 w-4" />
							<span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
						</Button>
						<ModeToggle />

						{/* User menu */}
						<DropdownMenu>
							<DropdownMenuTrigger>
								<button
									type="button"
									className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											// src={user?.avatar_url || undefined}
											alt={user?.fullName || ""}
										/>
										<AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
											{initials}
										</AvatarFallback>
									</Avatar>
									<span className="hidden text-sm font-medium md:block">
										{user?.fullName || "User"}
									</span>
									<ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>
									<div className="flex flex-col gap-1">
										<span className="text-sm font-medium">
											{user?.fullName || "User"}
										</span>
										<span className="text-xs text-muted-foreground">
											{user?.email}
										</span>
										<div className="mt-1">
											{isAdmin() ? (
												<Badge
													variant="default"
													className="bg-warning text-warning-foreground"
												>
													<Shield className="mr-1 h-3 w-3" />
													Admin
												</Badge>
											) : (
												<Badge variant="secondary">User</Badge>
											)}
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/dashboard/settings" className="cursor-pointer">
										<Settings className="mr-2 h-4 w-4" />
										Settings
									</Link>
								</DropdownMenuItem>
								{isAdmin() && (
									<>
										<DropdownMenuItem>
											<Link to="/dashboard/admin" className="cursor-pointer">
												<Shield className="mr-2 h-4 w-4" />
												Admin Overview
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link
												to="/dashboard/admin/users"
												className="cursor-pointer"
											>
												<Users className="mr-2 h-4 w-4" />
												Manage Users
											</Link>
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="cursor-pointer text-destructive focus:text-destructive"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Sign Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Page content */}
				<main className="p-4 md:p-6 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
