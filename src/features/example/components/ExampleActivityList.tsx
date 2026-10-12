import {
	Inbox,
	type LucideIcon,
	MessageSquare,
	Pencil,
	PlusCircle,
	RefreshCw,
	Trash2,
} from "lucide-react";
import { ContentLoading } from "@/components/common/ContentLoading";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useExampleActivity } from "../hooks/useExampleActivity";
import type { ExampleActivityItem, ExampleActivityType } from "../types";

const ACTIVITY_META: Record<
	ExampleActivityType,
	{ icon: LucideIcon; className: string }
> = {
	created: { icon: PlusCircle, className: "bg-success/10 text-success" },
	updated: { icon: Pencil, className: "bg-info/10 text-info" },
	deleted: { icon: Trash2, className: "bg-destructive/10 text-destructive" },
	comment: { icon: MessageSquare, className: "bg-primary/10 text-primary" },
};

const relativeTimeFormat = new Intl.RelativeTimeFormat("es", {
	numeric: "auto",
});

const TIME_UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
	{ unit: "day", ms: 86_400_000 },
	{ unit: "hour", ms: 3_600_000 },
	{ unit: "minute", ms: 60_000 },
];

const formatRelativeTime = (isoDate: string): string => {
	const diff = new Date(isoDate).getTime() - Date.now();

	for (const { unit, ms } of TIME_UNITS) {
		if (Math.abs(diff) >= ms) {
			return relativeTimeFormat.format(Math.round(diff / ms), unit);
		}
	}

	return relativeTimeFormat.format(0, "minute");
};

const ActivityRow = ({ item }: { item: ExampleActivityItem }) => {
	const { icon: Icon, className } = ACTIVITY_META[item.type];

	return (
		<li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
			<span
				className={cn(
					"flex size-9 shrink-0 items-center justify-center rounded-full",
					className,
				)}
			>
				<Icon className="h-4 w-4" />
			</span>
			<div className="flex flex-1 flex-col gap-0.5">
				<span className="text-sm font-medium">{item.title}</span>
				<span className="text-sm text-muted-foreground">
					{item.description}
				</span>
			</div>
			<span className="shrink-0 text-xs text-muted-foreground">
				{formatRelativeTime(item.createdAt)}
			</span>
		</li>
	);
};

export const ExampleActivityList = () => {
	const { data, isPending, isError, refetch } = useExampleActivity();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Actividad reciente</CardTitle>
				<CardDescription>
					Últimos movimientos de tu cuenta. Datos mock con latencia simulada.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isPending ? (
					<ContentLoading variant="list" rows={6} label="Cargando actividad" />
				) : isError || !data ? (
					<div className="flex flex-col items-center gap-3 py-10 text-center">
						<p className="text-sm text-destructive">
							No se pudo cargar la actividad.
						</p>
						<Button variant="outline" size="sm" onClick={() => refetch()}>
							<RefreshCw className="mr-2 h-4 w-4" />
							Reintentar
						</Button>
					</div>
				) : data.length === 0 ? (
					<div className="flex flex-col items-center gap-2 py-10 text-center">
						<Inbox className="size-8 text-muted-foreground" />
						<p className="text-sm font-medium">Sin actividad</p>
						<p className="text-sm text-muted-foreground">
							Cuando hagas cambios aparecerán acá.
						</p>
					</div>
				) : (
					<ul className="divide-y divide-border">
						{data.map((item) => (
							<ActivityRow key={item.id} item={item} />
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	);
};
