import { Toaster } from "sonner";
import { Providers } from "@/app/providers";

export const App = () => {
	return (
		<Providers>
			<Toaster position="bottom-right" richColors closeButton theme="system" />
			<h1 className="text-2xl font-bold">Hola mundo!!</h1>
		</Providers>
	);
};

export default App;
