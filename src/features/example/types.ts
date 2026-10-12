export type ExampleUserStatus = "active" | "inactive";

export interface ExampleUser {
	id: string;
	fullName: string;
	email: string;
	department: string;
	status: ExampleUserStatus;
}

export interface ExampleStat {
	id: string;
	label: string;
	value: string;
	hint: string;
	trend?: {
		value: number;
		direction: "up" | "down";
	};
}

export type ExampleActivityType = "created" | "updated" | "deleted" | "comment";

export interface ExampleActivityItem {
	id: string;
	type: ExampleActivityType;
	title: string;
	description: string;
	createdAt: string;
}
