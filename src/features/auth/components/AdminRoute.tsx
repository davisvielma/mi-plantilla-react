import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { FullScreenLoading } from "@/components/common/FullScreenLoading";
import { routes } from "@/lib/routes";
import { useAuthStore } from "../store";

export const AdminRoute = ({ children }: PropsWithChildren) => {
	const { hasRole, authStatus } = useAuthStore();

	if (authStatus === "checking") return <FullScreenLoading />;

	if (authStatus === "not-authenticated")
		return <Navigate to={routes.auth.login} replace />;

	if (!hasRole("admin")) return <Navigate to={routes.home} replace />;

	return children;
};
