import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentLoadingProps {
	variant?: "list" | "table" | "cards";
	rows?: number;
	label?: string;
	className?: string;
}

const skeletonIds = (prefix: string, rows: number): string[] =>
	Array.from({ length: rows }, (_, index) => `${prefix}-${index}`);

const SkeletonList = ({ rows }: { rows: number }) => (
	<div className="flex flex-col gap-4">
		{skeletonIds("list-row", rows).map((id) => (
			<div key={id} className="flex items-center gap-3">
				<Skeleton className="size-9 shrink-0 rounded-full" />
				<div className="flex flex-1 flex-col gap-2">
					<Skeleton className="h-4 w-1/3" />
					<Skeleton className="h-3 w-1/4" />
				</div>
			</div>
		))}
	</div>
);

const SkeletonTable = ({ rows }: { rows: number }) => (
	<div className="flex flex-col gap-3">
		<div className="flex items-center gap-3">
			<Skeleton className="h-4 w-1/4" />
			<Skeleton className="ml-auto h-4 w-1/4" />
		</div>
		{skeletonIds("table-row", rows).map((id) => (
			<div key={id} className="flex items-center gap-3">
				<Skeleton className="h-4 flex-1" />
				<Skeleton className="h-4 flex-1" />
				<Skeleton className="h-4 w-1/5" />
			</div>
		))}
	</div>
);

const SkeletonCards = ({ rows }: { rows: number }) => (
	<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{skeletonIds("card", rows).map((id) => (
			<div
				key={id}
				className="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10"
			>
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-5/6" />
			</div>
		))}
	</div>
);

export const ContentLoading = ({
	variant = "list",
	rows = 5,
	label = "Cargando contenido",
	className,
}: ContentLoadingProps) => (
	<div
		role="status"
		aria-busy="true"
		aria-live="polite"
		className={cn("w-full", className)}
	>
		<span className="sr-only">{label}</span>
		{variant === "table" && <SkeletonTable rows={rows} />}
		{variant === "cards" && <SkeletonCards rows={rows} />}
		{variant === "list" && <SkeletonList rows={rows} />}
	</div>
);
