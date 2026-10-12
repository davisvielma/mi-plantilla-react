import type { UserRole } from "@/types/roles";

export const routes = {
	home: "/",
	auth: {
		root: "/auth",
		login: "/auth/login",
		register: "/auth/register",
	},
	admin: {
		root: "/admin",
		dashboard: "/admin/dashboard",
	},
	user: {
		root: "/user",
		dashboard: "/user/dashboard",
	},
} as const;

const landingByRole = {
	user: routes.user.dashboard,
	admin: routes.admin.dashboard,
	"super-user": routes.user.dashboard,
} satisfies Record<UserRole, string>;

export const roleLandingPath = (role: UserRole): string => landingByRole[role];

export { generatePath as buildRoute } from "react-router";
