import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { parsePageParam } from "@/lib/pagination";
import { getExampleUsers } from "../api/get-example-users";

export const EXAMPLE_USERS_QUERY_KEY = ["example", "users"] as const;

interface UseExampleUsersParams {
	perPage?: number;
}

export const useExampleUsers = ({
	perPage = 10,
}: UseExampleUsersParams = {}) => {
	const [searchParams] = useSearchParams();

	const page = parsePageParam(searchParams.get("page"));
	const search = searchParams.get("q") ?? "";

	return useQuery({
		queryKey: [...EXAMPLE_USERS_QUERY_KEY, { page, perPage, search }],
		queryFn: ({ signal }) => getExampleUsers({ page, perPage, search, signal }),
		placeholderData: (previousData) => previousData,
		staleTime: 30_000,
	});
};
