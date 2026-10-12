import { Search as SearchIcon, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";

interface Props {
	placeholder?: string;
	label?: string;
	debounceMs?: number;
	disabled?: boolean;
	className?: string;
}

const SEARCH_PARAM = "q";

const withQuery = (
	params: URLSearchParams,
	term: string,
	resetPage: boolean,
): URLSearchParams => {
	const next = new URLSearchParams(params);

	if (term === "") next.delete(SEARCH_PARAM);
	else next.set(SEARCH_PARAM, term);

	if (resetPage) next.delete("page");

	return next;
};

export const Search = ({
	placeholder = "Buscar...",
	label = "Buscar",
	debounceMs = 350,
	disabled = false,
	className,
}: Props) => {
	const inputId = useId();
	const [searchParams, setSearchParams] = useSearchParams();

	const rawQuery = searchParams.get(SEARCH_PARAM);
	const urlQuery = rawQuery ?? "";

	const [term, setTerm] = useState(urlQuery);
	const debouncedTerm = useDebouncedValue(term, debounceMs);
	const pendingTerm = useRef(urlQuery);
	const writtenTerm = useRef(urlQuery);

	useEffect(() => {
		if (urlQuery === writtenTerm.current) return;

		pendingTerm.current = urlQuery;
		writtenTerm.current = urlQuery;
		setTerm(urlQuery);
	}, [urlQuery]);

	useEffect(() => {
		if (debouncedTerm !== pendingTerm.current) return;

		const canonicalQuery = debouncedTerm === "" ? null : debouncedTerm;

		if (rawQuery === canonicalQuery) return;

		writtenTerm.current = debouncedTerm;
		setSearchParams(
			(prev) => withQuery(prev, debouncedTerm, urlQuery !== debouncedTerm),
			{ replace: true },
		);
	}, [debouncedTerm, urlQuery, rawQuery, setSearchParams]);

	const applyTerm = (value: string) => {
		pendingTerm.current = value;
		setTerm(value);
	};

	const writeTerm = (value: string) => {
		if (value === writtenTerm.current) return;

		writtenTerm.current = value;
		setSearchParams((prev) => withQuery(prev, value, urlQuery !== value), {
			replace: true,
		});
	};

	const handleChange = (value: string) => {
		applyTerm(value);

		if (value === "") writeTerm("");
	};

	return (
		<search className={cn("relative w-full max-w-xs", className)}>
			<label htmlFor={inputId} className="sr-only">
				{label}
			</label>
			<SearchIcon
				aria-hidden="true"
				className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
			/>
			<Input
				id={inputId}
				type="search"
				value={term}
				placeholder={placeholder}
				disabled={disabled}
				autoComplete="off"
				onChange={(event) => handleChange(event.target.value)}
				className="pr-8 pl-8 [&::-webkit-search-cancel-button]:hidden"
			/>
			{term.length > 0 && (
				<Button
					variant="ghost"
					size="icon-xs"
					onClick={() => handleChange("")}
					disabled={disabled}
					aria-label="Limpiar búsqueda"
					className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
				>
					<X />
				</Button>
			)}
		</search>
	);
};
