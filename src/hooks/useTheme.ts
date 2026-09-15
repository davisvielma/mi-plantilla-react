import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("useTheme debe usarse dentro de un ThemeProvider");
	}

	return context;
};
