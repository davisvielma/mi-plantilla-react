import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
	clampPage,
	getPaginationItems,
	isFirstPage,
	isLastPage,
	PAGE_ELLIPSIS,
	parsePageParam,
} from "@/lib/pagination";
import { cn } from "@/lib/utils";

interface Props {
	totalPages: number;
	siblings?: number;
	disabled?: boolean;
	className?: string;
}

export const Pagination = ({
	totalPages,
	siblings = 1,
	disabled = false,
	className,
}: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const total = Math.max(0, Math.floor(totalPages));
	const rawPage = searchParams.get("page");
	const requestedPage = parsePageParam(rawPage);
	const page = clampPage(requestedPage, total);
	const isOutOfRange = requestedPage !== page;
	const canonicalPage = page > 1 ? String(page) : null;

	useEffect(() => {
		if (rawPage === canonicalPage) return;

		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);

				if (canonicalPage === null) next.delete("page");
				else next.set("page", canonicalPage);

				return next;
			},
			{ replace: true },
		);
	}, [rawPage, canonicalPage, setSearchParams]);

	const handlePageChange = (nextPage: number) => {
		if (nextPage < 1 || nextPage > total) return;

		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);

			next.set("page", String(nextPage));

			return next;
		});
	};

	if (total <= 1) return null;

	const items = getPaginationItems(page, total, siblings);
	const canGoBack = !disabled && (isOutOfRange || !isFirstPage(page));
	const canGoForward = !disabled && !isLastPage(page, total);

	return (
		<nav
			aria-label="Paginación"
			className={cn("flex flex-wrap items-center gap-1", className)}
		>
			<Button
				variant="outline"
				size="icon-sm"
				onClick={() => handlePageChange(isOutOfRange ? page : page - 1)}
				disabled={!canGoBack}
				aria-label="Página anterior"
			>
				<ChevronLeft />
			</Button>

			{items.map((item, index) =>
				item === PAGE_ELLIPSIS ? (
					<span
						key={`ellipsis-${String(index)}`}
						aria-hidden="true"
						className="flex size-7 items-center justify-center text-muted-foreground"
					>
						<MoreHorizontal className="size-4" />
					</span>
				) : (
					<Button
						key={item}
						variant={item === page ? "default" : "outline"}
						size="icon-sm"
						onClick={() => handlePageChange(item)}
						disabled={disabled}
						aria-label={`Página ${item}`}
						aria-current={item === page ? "page" : undefined}
					>
						{item}
					</Button>
				),
			)}

			<Button
				variant="outline"
				size="icon-sm"
				onClick={() => handlePageChange(page + 1)}
				disabled={!canGoForward}
				aria-label="Página siguiente"
			>
				<ChevronRight />
			</Button>
		</nav>
	);
};
