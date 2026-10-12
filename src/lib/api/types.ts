export type ApiResponse<T> = {
	data: T;
	statusCode: number;
	timestamp: string;
	path: string;
	method: string;
};

export type Paginated<T> = {
	items: T[];
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
};

export interface ApiErrorBody {
	statusCode: number;
	errorCode: string;
	timestamp: string;
	path: string;
	method: string;
	message: string | string[];
}
