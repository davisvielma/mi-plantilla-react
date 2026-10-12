import {
	LayoutDashboard,
	type LucideIcon,
	// Shield
} from "lucide-react";
import { routes } from "@/lib/routes";
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
			{
				label: "Dashboard",
				href: routes.user.dashboard,
				icon: LayoutDashboard,
				roles: ["user", "super-user"],
			},
			{
				label: "Dashboard",
				href: routes.admin.dashboard,
				icon: LayoutDashboard,
				roles: ["admin"],
			},
		],
	},
	// {
	// 	title: "Administration",
	// 	items: [
	// 		{
	// 			label: "Admin Overview",
	// 			href: routes.admin.dashboard,
	// 			icon: Shield,
	// 			roles: ["admin"],
	// 		},
	// 	],
	// },
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
