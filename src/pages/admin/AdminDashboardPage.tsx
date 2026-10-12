import { ExampleUsersTable } from "@/features/example/components/ExampleUsersTable";

export const AdminDashboardPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h1 className="font-heading text-2xl font-semibold">
					Panel de administración
				</h1>
				<p className="text-sm text-muted-foreground">
					Ejemplo de listados con búsqueda, paginación y loading interno.
				</p>
			</header>

			<ExampleUsersTable />
		</div>
	);
};
