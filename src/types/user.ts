export interface User {
	id: string;
	email: string;
	fullName: string;
	role: Role;
}

export interface Role {
	id: string;
	name: string;
}
