import { Outlet } from "react-router";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

const sections = [
	{
		ref: "features",
		text: "Características",
	},
	{
		ref: "pricing",
		text: "Precios",
	},
	{
		ref: "about",
		text: "Acerca de",
	},
];

export const AppLayout = () => {
	return (
		<main className="min-h-screen bg-background">
			<Header sections={sections} />
			<Outlet />
			<Footer sections={sections} />
		</main>
	);
};
