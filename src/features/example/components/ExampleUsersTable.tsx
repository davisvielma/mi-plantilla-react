import { Inbox, RefreshCw } from "lucide-react";
import { ContentLoading } from "@/components/common/ContentLoading";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/Search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useExampleUsers } from "../hooks/useExampleUsers";
import type { ExampleUser } from "../types";

const STATUS_LABEL: Record<ExampleUser["status"], string> = {
	active: "Activo",
	inactive: "Inactivo",
};

interface ExampleUsersTableProps {
	perPage?: number;
}

const UsersTableBody = ({ users }: { users: ExampleUser[] }) => (
	<TableBody>
		{users.map((user) => (
			<TableRow key={user.id}>
				<TableCell className="font-medium">{user.fullName}</TableCell>
				<TableCell className="text-muted-foreground">{user.email}</TableCell>
				<TableCell className="text-muted-foreground">
					{user.department}
				</TableCell>
				<TableCell>
					<Badge
						variant={user.status === "active" ? "default" : "secondary"}
						className={
							user.status === "active"
								? "bg-success text-success-foreground"
								: undefined
						}
					>
						{STATUS_LABEL[user.status]}
					</Badge>
				</TableCell>
			</TableRow>
		))}
	</TableBody>
);

export const ExampleUsersTable = ({ perPage = 10 }: ExampleUsersTableProps) => {
	const { data, isPending, isFetching, isError, refetch } = useExampleUsers({
		perPage,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Usuarios de ejemplo</CardTitle>
				<CardDescription>
					Datos mock con latencia simulada para probar búsqueda, paginación y
					loading interno de contenido.
				</CardDescription>
				<CardAction>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => refetch()}
						disabled={isFetching}
						aria-label="Recargar usuarios"
					>
						<RefreshCw className={cn(isFetching && "animate-spin")} />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Search
						placeholder="Buscar por nombre, email o área..."
						label="Buscar usuarios"
					/>
					{data && !isPending && (
						<span className="text-xs text-muted-foreground">
							{data.totalItems} resultado{data.totalItems === 1 ? "" : "s"}
						</span>
					)}
				</div>

				{isPending ? (
					<ContentLoading variant="table" rows={perPage} />
				) : isError || !data ? (
					<div className="flex flex-col items-center gap-3 py-10 text-center">
						<p className="text-sm text-destructive">
							No se pudieron cargar los usuarios.
						</p>
						<Button variant="outline" size="sm" onClick={() => refetch()}>
							Reintentar
						</Button>
					</div>
				) : data.items.length === 0 ? (
					<div className="flex flex-col items-center gap-2 py-10 text-center">
						<Inbox className="size-8 text-muted-foreground" />
						<p className="text-sm font-medium">Sin resultados</p>
						<p className="text-sm text-muted-foreground">
							Probá con otro término de búsqueda.
						</p>
					</div>
				) : (
					<div
						className={cn(
							"transition-opacity",
							isFetching && "pointer-events-none opacity-50",
						)}
					>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Área</TableHead>
									<TableHead>Estado</TableHead>
								</TableRow>
							</TableHeader>
							<UsersTableBody users={data.items} />
						</Table>
					</div>
				)}

				{data && !isPending && !isError && data.totalItems > 0 && (
					<div className="flex flex-wrap items-center justify-between gap-3">
						<span className="text-xs text-muted-foreground">
							Página {data.page} de {data.totalPages}
						</span>
						<Pagination totalPages={data.totalPages} disabled={isFetching} />
					</div>
				)}
			</CardContent>
		</Card>
	);
};
