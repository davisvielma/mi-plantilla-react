import { useQuery } from "@tanstack/react-query";
import { getExampleActivity } from "../api/get-example-activity";

export const EXAMPLE_ACTIVITY_QUERY_KEY = ["example", "activity"] as const;

export const useExampleActivity = () =>
	useQuery({
		queryKey: EXAMPLE_ACTIVITY_QUERY_KEY,
		queryFn: ({ signal }) => getExampleActivity({ signal }),
		staleTime: 60_000,
	});
