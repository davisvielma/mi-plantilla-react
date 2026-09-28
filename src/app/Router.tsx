import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "@/components/layouts/AppLayout";
import { AdminRoute } from "@/features/auth/components/AdminRoute";
import { NotAuthenticatedRoute } from "@/features/auth/components/NotAuthenticatedRoute";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));
const DashboardLayout = lazy(
	() => import("@/components/layouts/DashboardLayout"),
);

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
		path: "admin",
		element: (
			<AdminRoute>
				<DashboardLayout />
			</AdminRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/admin/dashboard" /> },
			{ path: "dashboard", element: <AdminDashboardPage /> },
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
