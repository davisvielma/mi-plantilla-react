import {
	CheckCircle2,
	Clock,
	FolderKanban,
	type LucideIcon,
	RefreshCw,
	TrendingDown,
	TrendingUp,
	Users,
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
import { useExampleStats } from "../hooks/useExampleStats";
import type { ExampleStat } from "../types";

const STAT_ICONS: Record<string, LucideIcon> = {
	projects: FolderKanban,
	tasks: CheckCircle2,
	hours: Clock,
	team: Users,
};

const StatCard = ({ stat }: { stat: ExampleStat }) => {
	const Icon = STAT_ICONS[stat.id] ?? FolderKanban;
	const isPositive = stat.trend?.direction === "up";
	const TrendIcon = isPositive ? TrendingUp : TrendingDown;

	return (
		<Card>
			<CardHeader>
				<CardDescription className="flex items-center gap-2">
					<Icon className="h-4 w-4 text-muted-foreground" />
					{stat.label}
				</CardDescription>
				<CardTitle className="text-3xl font-semibold tabular-nums">
					{stat.value}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-2">
				<span className="text-xs text-muted-foreground">{stat.hint}</span>
				{stat.trend && (
					<span
						className={cn(
							"flex items-center gap-1 text-xs font-medium",
							isPositive ? "text-success" : "text-destructive",
						)}
					>
						<TrendIcon className="h-3.5 w-3.5" />
						{stat.trend.value}%
					</span>
				)}
			</CardContent>
		</Card>
	);
};

export const ExampleStatsCards = () => {
	const { data, isPending, isError, refetch } = useExampleStats();

	if (isPending) {
		return (
			<ContentLoading variant="cards" rows={4} label="Cargando métricas" />
		);
	}

	if (isError || !data) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<p className="text-sm text-destructive">
					No se pudieron cargar las métricas.
				</p>
				<Button variant="outline" size="sm" onClick={() => refetch()}>
					<RefreshCw className="mr-2 h-4 w-4" />
					Reintentar
				</Button>
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{data.map((stat) => (
				<StatCard key={stat.id} stat={stat} />
			))}
		</div>
	);
};
