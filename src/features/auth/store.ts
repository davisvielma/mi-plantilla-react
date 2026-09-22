import { create } from "zustand";
import { clearSession, setSession } from "@/lib/api/client";
import type { AuthStatus } from "@/types/auth";
import type { User } from "@/types/user";
import { login as loginRequest } from "./api/login";
import { logout as logoutRequest } from "./api/logout";
import { getMe as getMeRequest } from "./api/me";
import { register as registerRequest } from "./api/register";

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
			const { user, accessToken, refreshToken } = await loginRequest({
				email,
				password,
			});
			setSession(accessToken, refreshToken);
			set({ user, accessToken, refreshToken, authStatus: "authenticated" });
			return true;
		} catch {
			clearSession();
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
			const { user, accessToken, refreshToken } = await registerRequest({
				email,
				password,
				fullName,
			});
			setSession(accessToken, refreshToken);
			set({ user, accessToken, refreshToken, authStatus: "authenticated" });
			return true;
		} catch {
			clearSession();
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
			await logoutRequest();
			clearSession();
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
			const { user, accessToken, refreshToken } = await getMeRequest();
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
