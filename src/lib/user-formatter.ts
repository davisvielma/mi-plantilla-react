import type { User } from "@/types/user";

export const initialsFullName = (user: User | null) => {
	return (user?.fullName || user?.email || "U")
		.trim()
		.split(" ")
		.map((s) => s[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
};

export const fullNameFormat = (user: User | null) => {
	return (user?.fullName || "User")
		.trim()
		.split(" ")
		.map((s) => s[0].toUpperCase() + s.slice(1))
		.join(" ");
};
