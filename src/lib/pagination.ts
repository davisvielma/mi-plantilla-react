export const PAGE_ELLIPSIS = "ellipsis";

export type PaginationItem = number | typeof PAGE_ELLIPSIS;

const range = (from: number, to: number): number[] =>
	Array.from({ length: to - from + 1 }, (_, index) => from + index);

export const getPaginationItems = (
	page: number,
	totalPages: number,
	siblings = 1,
): PaginationItem[] => {
	const total = Math.max(0, Math.floor(totalPages));

	if (total <= 0) return [];

	const current = Math.min(Math.max(1, Math.floor(page)), total);
	const maxSiblings = Math.max(0, Math.floor(siblings));
	const visibleSlots = maxSiblings * 2 + 5;

	if (total <= visibleSlots) return range(1, total);

	const left = Math.max(2, current - maxSiblings);
	const right = Math.min(total - 1, current + maxSiblings);

	const showLeftEllipsis = left > 2;
	const showRightEllipsis = right < total - 1;

	if (!showLeftEllipsis && showRightEllipsis) {
		const leftItemCount = 3 + 2 * maxSiblings;
		return [...range(1, leftItemCount), PAGE_ELLIPSIS, total];
	}

	if (showLeftEllipsis && !showRightEllipsis) {
		const rightItemCount = 3 + 2 * maxSiblings;
		return [1, PAGE_ELLIPSIS, ...range(total - rightItemCount + 1, total)];
	}

	return [1, PAGE_ELLIPSIS, ...range(left, right), PAGE_ELLIPSIS, total];
};

export const isFirstPage = (page: number): boolean => page <= 1;

export const isLastPage = (page: number, totalPages: number): boolean =>
	page >= totalPages;

export const parsePageParam = (value: string | null | undefined): number => {
	const parsed = Number.parseInt(value ?? "", 10);

	return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export const clampPage = (page: number, totalPages: number): number => {
	const total = Math.max(0, Math.floor(totalPages));

	return Math.min(Math.max(1, Math.floor(page)), Math.max(total, 1));
};
