export const MOCK_LATENCY_MS = 900;

export const simulateLatency = (ms: number, signal?: AbortSignal) =>
	new Promise<void>((resolve) => {
		const timeout = setTimeout(resolve, ms);

		signal?.addEventListener("abort", () => clearTimeout(timeout), {
			once: true,
		});
	});
