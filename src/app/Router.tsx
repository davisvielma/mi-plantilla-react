import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layouts/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [{ index: true, element: <HomePage /> }],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
