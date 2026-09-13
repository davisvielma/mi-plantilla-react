import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "@/app/providers";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: standard Vite template
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>,
);
