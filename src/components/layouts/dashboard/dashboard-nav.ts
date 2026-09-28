import {
	LayoutDashboard,
	type LucideIcon,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import type { UserRole } from "@/types/roles";
import type { User } from "@/types/user";

export interface NavItem {
	label: string;
	href: string;
	icon: LucideIcon;
	roles?: UserRole[];
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

export const navSections: NavSection[] = [
	{
		title: "Main",
		items: [
			{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
			{ label: "Configuración", href: "/dashboard/settings", icon: Settings },
		],
	},
	{
		title: "Administration",
		items: [
			{
				label: "Admin Overview",
				href: "/dashboard/admin",
				icon: Shield,
				roles: ["admin"],
			},
			{
				label: "User Management",
				href: "/dashboard/admin/users",
				icon: Users,
				roles: ["admin"],
			},
		],
	},
];

const canAccess = (item: NavItem, user: User | null) =>
	!item.roles || (user !== null && item.roles.includes(user.role.name));

export const getNavSections = (user: User | null): NavSection[] =>
	navSections
		.map((section) => ({
			...section,
			items: section.items.filter((item) => canAccess(item, user)),
		}))
		.filter((section) => section.items.length > 0);

export const getUserMenuItems = (user: User | null): NavItem[] =>
	navSections
		.flatMap((section) => section.items)
		.filter((item) => canAccess(item, user));
