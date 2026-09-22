import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "@/components/layouts/AppLayout";
import { NotAuthenticatedRoute } from "@/features/auth/components/NotAuthenticatedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [{ index: true, element: <HomePage /> }],
	},
	{
		path: "auth",
		element: (
			<NotAuthenticatedRoute>
				<AuthLayout />
			</NotAuthenticatedRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/auth/login" /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
