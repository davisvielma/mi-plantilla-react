import { useState } from "react";
import { Outlet } from "react-router";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-background">
			<DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

			<div className="lg:pl-64">
				<DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />

				<main className="p-4 md:p-6 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
