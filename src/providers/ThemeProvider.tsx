import { createContext, type ReactNode, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const initialState: ThemeContextType = {
	theme: "system",
	setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);

export const ThemeProvider = ({
	children,
	defaultTheme = "system",
	storageKey = "theme",
	...props
}: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = window.document.documentElement;

		const applyTheme = (currentTheme: Theme) => {
			root.classList.remove("light", "dark");

			if (currentTheme === "system") {
				const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
					.matches
					? "dark"
					: "light";
				root.classList.add(systemTheme);
			} else {
				root.classList.add(currentTheme);
			}
		};

		applyTheme(theme);

		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => applyTheme("system");
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	const value = {
		theme,
		setTheme: (newTheme: Theme) => {
			localStorage.setItem(storageKey, newTheme);
			setTheme(newTheme);
		},
	};

	return (
		<ThemeContext.Provider {...props} value={value}>
			{children}
		</ThemeContext.Provider>
	);
};
