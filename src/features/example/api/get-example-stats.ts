import type { ExampleStat } from "../types";
import { MOCK_LATENCY_MS, simulateLatency } from "./mock";

const MOCK_STATS: ExampleStat[] = [
	{
		id: "projects",
		label: "Proyectos activos",
		value: "12",
		hint: "3 creados este mes",
		trend: { value: 8.2, direction: "up" },
	},
	{
		id: "tasks",
		label: "Tareas completadas",
		value: "148",
		hint: "de 210 asignadas",
		trend: { value: 12.5, direction: "up" },
	},
	{
		id: "hours",
		label: "Horas registradas",
		value: "37.5",
		hint: "esta semana",
		trend: { value: 4.1, direction: "down" },
	},
	{
		id: "team",
		label: "Miembros del equipo",
		value: "8",
		hint: "2 invitaciones pendientes",
	},
];

export const getExampleStats = async ({
	signal,
}: {
	signal?: AbortSignal;
} = {}): Promise<ExampleStat[]> => {
	await simulateLatency(MOCK_LATENCY_MS, signal);

	return MOCK_STATS;
};
