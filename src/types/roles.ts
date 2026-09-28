export const ROLES = ["user", "admin", "super-user"] as const;

export type UserRole = (typeof ROLES)[number];
