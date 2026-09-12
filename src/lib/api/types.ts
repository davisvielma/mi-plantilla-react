export type ApiResponse<T> = {
	data: T;
	statusCode: number;
	timestamp: string;
	path: string;
	method: string;
};
