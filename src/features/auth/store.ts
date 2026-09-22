import { create } from "zustand";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/api/client";
import type { AuthStatus } from "@/types/auth";
import type { User } from "@/types/user";
import { loginAction } from "./api/login";
import { logoutAction } from "./api/logout";
import { meAction } from "./api/me";
import { registerAction } from "./api/register";

interface AuthState {
	// properties
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	authStatus: AuthStatus;
	// getters
	isAdmin: () => boolean;
	// actions
	login: (email: string, password: string) => Promise<boolean>;
	register: (
		email: string,
		password: string,
		fullName: string,
	) => Promise<boolean>;
	logout: () => Promise<boolean>;
	checkAuthMe: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
	user: null,
	accessToken: null,
	refreshToken: null,
	authStatus: "checking",
	isAdmin: () => {
		const role = get().user?.role.name;
		return role === "admin";
	},
	login: async (email: string, password: string) => {
		try {
			const { user, accessToken, refreshToken } = await loginAction({
				email,
				password,
			});
			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			set({ user, accessToken, refreshToken, authStatus: "authenticated" });
			return true;
		} catch {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				authStatus: "not-authenticated",
			});
			return false;
		}
	},
	register: async (email: string, password: string, fullName: string) => {
		try {
			const { user, accessToken, refreshToken } = await registerAction({
				email,
				password,
				fullName,
			});
			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			set({ user, accessToken, refreshToken, authStatus: "authenticated" });
			return true;
		} catch {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				authStatus: "not-authenticated",
			});
			return false;
		}
	},
	logout: async () => {
		try {
			await logoutAction();
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				authStatus: "not-authenticated",
			});
			return true;
		} catch {
			return false;
		}
	},
	checkAuthMe: async () => {
		try {
			const { user, accessToken, refreshToken } = await meAction();
			set({ user, accessToken, refreshToken, authStatus: "authenticated" });
			return true;
		} catch {
			set({
				user: null,
				accessToken: null,
				refreshToken: null,
				authStatus: "not-authenticated",
			});
			return false;
		}
	},
}));
