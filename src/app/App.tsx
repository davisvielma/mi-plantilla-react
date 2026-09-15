import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import { Router } from "@/app/Router";
import { useTheme } from "@/hooks/useTheme";

export const App = () => {
	const { theme } = useTheme();

	return (
		<>
			<Toaster
				position="bottom-right"
				richColors
				closeButton
				theme={theme}
				expand
			/>
			<RouterProvider router={Router} />
		</>
	);
};

export default App;
