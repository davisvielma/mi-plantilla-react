import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { lazy, type ReactNode, Suspense } from "react";
import { toast } from "sonner";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface ErrorToast {
	title: string;
	description?: ReactNode;
}

const getErrorToast = (error: unknown): ErrorToast => {
	if (axios.isAxiosError(error)) {
		const res = error.response?.data;
		const message =
			res && typeof res === "object"
				? (res as Record<string, unknown>).message
				: undefined;

		if (Array.isArray(message)) {
			return {
				title: "Datos inválidos",
				description: (
					<ul className="list-disc pl-5 text-left">
						{message.map((m) => (
							<li key={String(m)}>{String(m)}</li>
						))}
					</ul>
				),
			};
		}

		if (typeof message === "string") return { title: message };

		return { title: error.message || "Error al comunicarse con el servidor" };
	}

	if (error instanceof Error) {
		return { title: error.message };
	}

	return { title: "Error desconocido" };
};

const reportError = (error: Error) => {
	const toastData = getErrorToast(error);
	toast.error(toastData.title, { description: toastData.description });
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
		},
	},
	queryCache: new QueryCache({
		onError: reportError,
	}),
	mutationCache: new MutationCache({
		onError: reportError,
	}),
});

const ReactQueryDevtools = lazy(() =>
	import("@tanstack/react-query-devtools").then((m) => ({
		default: m.ReactQueryDevtools,
	})),
);

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
			{import.meta.env.DEV && (
				<Suspense fallback={null}>
					<ReactQueryDevtools />
				</Suspense>
			)}
		</QueryClientProvider>
	);
};
