import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { FullScreenLoading } from "@/components/common/FullScreenLoading";
import { useAuthStore } from "@/features/auth/store";

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const checkAuthMe = useAuthStore((s) => s.checkAuthMe);

	const { isLoading } = useQuery({
		queryKey: ["auth", "session"],
		queryFn: checkAuthMe,
		retry: false,
		staleTime: 60_000,
		refetchOnWindowFocus: true,
	});

	if (isLoading) return <FullScreenLoading />;

	return children;
};
