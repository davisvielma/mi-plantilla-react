import { Toaster } from "sonner";
import { ModeToggle } from "./components/common/mode-toggle";
import { useTheme } from "./hooks/use-theme";

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
			<h1 className="text-2xl font-bold">Hola mundo!!</h1>
			<ModeToggle />
		</>
	);
};

export default App;
