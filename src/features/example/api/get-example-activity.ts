import type { ExampleActivityItem } from "../types";
import { MOCK_LATENCY_MS, simulateLatency } from "./mock";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const buildMockActivity = (): ExampleActivityItem[] => {
	const now = Date.now();

	type PendingActivity = Omit<ExampleActivityItem, "createdAt"> & {
		ago: number;
	};

	const events: PendingActivity[] = [
		{
			id: "activity-1",
			type: "created",
			title: "Creaste el proyecto Rediseño",
			description: "Se inicializó el tablero con 6 tareas pendientes.",
			ago: 12 * MINUTE,
		},
		{
			id: "activity-2",
			type: "comment",
			title: "Nuevo comentario de Ana",
			description: "“¿Revisamos los colores del hero antes del viernes?”",
			ago: 45 * MINUTE,
		},
		{
			id: "activity-3",
			type: "updated",
			title: "Actualizaste la especificación de la API",
			description: "Se añadieron los endpoints de paginación.",
			ago: 3 * HOUR,
		},
		{
			id: "activity-4",
			type: "created",
			title: "Invitación aceptada por Lucas",
			description: "Ahora forma parte del equipo de Ingeniería.",
			ago: DAY + 2 * HOUR,
		},
		{
			id: "activity-5",
			type: "deleted",
			title: "Eliminaste una tarea duplicada",
			description: "Se limpió el tablero del sprint anterior.",
			ago: 2 * DAY,
		},
		{
			id: "activity-6",
			type: "updated",
			title: "Cerraste el sprint 14",
			description: "18 de 21 tareas completadas.",
			ago: 4 * DAY,
		},
	];

	return events.map(({ ago, ...event }) => ({
		...event,
		createdAt: new Date(now - ago).toISOString(),
	}));
};

export const getExampleActivity = async ({
	signal,
}: {
	signal?: AbortSignal;
} = {}): Promise<ExampleActivityItem[]> => {
	await simulateLatency(MOCK_LATENCY_MS, signal);

	return buildMockActivity();
};
