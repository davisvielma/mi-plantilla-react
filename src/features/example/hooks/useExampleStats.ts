import { useQuery } from "@tanstack/react-query";
import { getExampleStats } from "../api/get-example-stats";

export const EXAMPLE_STATS_QUERY_KEY = ["example", "stats"] as const;

export const useExampleStats = () =>
	useQuery({
		queryKey: EXAMPLE_STATS_QUERY_KEY,
		queryFn: ({ signal }) => getExampleStats({ signal }),
		staleTime: 60_000,
	});
