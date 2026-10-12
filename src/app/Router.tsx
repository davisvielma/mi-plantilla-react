import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "@/components/layouts/app/AppLayout";
import { AdminRoute } from "@/features/auth/components/AdminRoute";
import { AuthenticatedRoute } from "@/features/auth/components/AuthenticatedRoute";
import { NotAuthenticatedRoute } from "@/features/auth/components/NotAuthenticatedRoute";
import { routes } from "@/lib/routes";
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
		path: routes.home,
		element: <AppLayout />,
		children: [{ index: true, element: <HomePage /> }],
	},
	{
		path: routes.auth.root,
		element: (
			<NotAuthenticatedRoute>
				<AuthLayout />
			</NotAuthenticatedRoute>
		),
		children: [
			{ index: true, element: <Navigate to={routes.auth.login} /> },
			{ path: routes.auth.login, element: <LoginPage /> },
			{ path: routes.auth.register, element: <RegisterPage /> },
		],
	},
	{
		path: routes.admin.root,
		element: (
			<AdminRoute>
				<DashboardLayout />
			</AdminRoute>
		),
		children: [
			{ index: true, element: <Navigate to={routes.admin.dashboard} /> },
			{ path: routes.admin.dashboard, element: <AdminDashboardPage /> },
		],
	},
	{
		path: routes.user.root,
		element: (
			<AuthenticatedRoute>
				<DashboardLayout />
			</AuthenticatedRoute>
		),
		children: [
			{ index: true, element: <Navigate to={routes.user.dashboard} /> },
			{ path: routes.user.dashboard, element: <UserDashboardPage /> },
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
