import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { FullScreenLoading } from "@/components/common/FullScreenLoading";
import { useAuthStore } from "../store";

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
	const { authStatus } = useAuthStore();

	if (authStatus === "checking") return <FullScreenLoading />;

	if (authStatus === "authenticated") return <Navigate to="/" replace />;

	return children;
};
