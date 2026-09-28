import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "@/components/layouts/app/AppLayout";
import { AdminRoute } from "@/features/auth/components/AdminRoute";
import { AuthenticatedRoute } from "@/features/auth/components/AuthenticatedRoute";
import { NotAuthenticatedRoute } from "@/features/auth/components/NotAuthenticatedRoute";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { UserDashboardPage } from "@/pages/user/UserDashboardPage";

const AuthLayout = lazy(() => import("@/components/layouts/auth/AuthLayout"));
const DashboardLayout = lazy(
	() => import("@/components/layouts/dashboard/DashboardLayout"),
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
		path: "user",
		element: (
			<AuthenticatedRoute>
				<DashboardLayout />
			</AuthenticatedRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/user/dashboard" /> },
			{ path: "dashboard", element: <UserDashboardPage /> },
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
