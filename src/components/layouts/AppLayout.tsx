import { Outlet } from "react-router";

export const AppLayout = () => {
	return (
		<main className="min-h-screen bg-background">
			<Outlet />
		</main>
	);
};
