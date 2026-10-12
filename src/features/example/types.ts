export type ExampleUserStatus = "active" | "inactive";

export interface ExampleUser {
	id: string;
	fullName: string;
	email: string;
	department: string;
	status: ExampleUserStatus;
}
