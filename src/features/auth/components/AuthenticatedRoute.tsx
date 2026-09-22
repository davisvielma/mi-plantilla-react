import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { FullScreenLoading } from "@/components/common/FullScreenLoading";
import { useAuthStore } from "../store";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
	const { authStatus } = useAuthStore();

	if (authStatus === "checking") return <FullScreenLoading />;

	if (authStatus === "not-authenticated")
		return <Navigate to="/auth/login" replace />;

	return children;
};
