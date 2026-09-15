import { createBrowserRouter } from "react-router";
import { NotFound } from "@/pages/NotFound";

export const Router = createBrowserRouter([
	{
		path: "*",
		element: <NotFound />,
	},
]);
