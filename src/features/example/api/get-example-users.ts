import type { Paginated } from "@/lib/api/types";
import type { ExampleUser } from "../types";
import { MOCK_LATENCY_MS, simulateLatency } from "./mock";

const FIRST_NAMES = [
	"Ana",
	"Brian",
	"Carla",
	"Diego",
	"Elena",
	"Fabián",
	"Greta",
	"Hugo",
	"Inés",
	"Julián",
	"Karen",
	"Lucas",
];

const LAST_NAMES = [
	"Álvarez",
	"Benítez",
	"Carrasco",
	"Domínguez",
	"Escobar",
	"Fernández",
	"Guzmán",
	"Henríquez",
	"Ibarra",
	"Juárez",
	"Klein",
	"López",
	"Maldonado",
	"Núñez",
];

const DEPARTMENTS = [
	"Ventas",
	"Soporte",
	"Finanzas",
	"Operaciones",
	"Marketing",
	"Ingeniería",
];

const buildMockUsers = (): ExampleUser[] =>
	Array.from({ length: 47 }, (_, index) => {
		const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
		const lastName = LAST_NAMES[(index * 5) % LAST_NAMES.length];
		const fullName = `${firstName} ${lastName}`;

		return {
			id: `example-user-${index + 1}`,
			fullName,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
			department: DEPARTMENTS[index % DEPARTMENTS.length],
			status: index % 4 === 0 ? "inactive" : "active",
		};
	});

const MOCK_USERS = buildMockUsers();

export interface GetExampleUsersParams {
	page?: number;
	perPage?: number;
	search?: string;
	signal?: AbortSignal;
}

export const getExampleUsers = async ({
	page = 1,
	perPage = 10,
	search = "",
	signal,
}: GetExampleUsersParams): Promise<Paginated<ExampleUser>> => {
	await simulateLatency(MOCK_LATENCY_MS, signal);

	const term = search.trim().toLowerCase();
	const filtered = term
		? MOCK_USERS.filter(
				(user) =>
					user.fullName.toLowerCase().includes(term) ||
					user.email.toLowerCase().includes(term) ||
					user.department.toLowerCase().includes(term),
			)
		: MOCK_USERS;

	const totalItems = filtered.length;
	const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
	const currentPage = Math.min(Math.max(1, page), totalPages);
	const start = (currentPage - 1) * perPage;

	return {
		items: filtered.slice(start, start + perPage),
		page: currentPage,
		perPage,
		totalItems,
		totalPages,
	};
};
