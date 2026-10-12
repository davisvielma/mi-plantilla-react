import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { FullScreenLoading } from "@/components/common/FullScreenLoading";
import { routes } from "@/lib/routes";
import { useAuthStore } from "../store";

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
	const { authStatus } = useAuthStore();

	if (authStatus === "checking") return <FullScreenLoading />;

	if (authStatus === "authenticated")
		return <Navigate to={routes.home} replace />;

	return children;
};
