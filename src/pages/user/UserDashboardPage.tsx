import { useAuthStore } from "@/features/auth/store";
import { ExampleActivityList } from "@/features/example/components/ExampleActivityList";
import { ExampleStatsCards } from "@/features/example/components/ExampleStatsCards";
import { fullNameFormat } from "@/lib/user-formatter";

export const UserDashboardPage = () => {
	const { user } = useAuthStore();

	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h1 className="font-heading text-2xl font-semibold">
					Hola, {fullNameFormat(user)}
				</h1>
				<p className="text-sm text-muted-foreground">
					Un resumen de tus métricas y de los últimos movimientos de tu cuenta.
				</p>
			</header>

			<ExampleStatsCards />
			<ExampleActivityList />
		</div>
	);
};
