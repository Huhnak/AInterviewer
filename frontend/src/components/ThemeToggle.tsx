import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useThemeStore();

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={toggleTheme}
                className={`relative h-8 w-14 rounded-full p-1 transition-colors duration-500 ease-in-out ${isDarkMode ? "bg-primary/20 border-primary/30" : "bg-background border-background"} cursor-pointer border outline-none`}
            >
                <div
                    className={`flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-500 ease-in-out ${isDarkMode ? "bg-primary translate-x-6" : "bg-surface-light translate-x-0"} `}
                >
                    {isDarkMode ? (
                        <Moon className="text-surface-light h-4 w-4 fill-current" />
                    ) : (
                        <Sun className="h-4 w-4 fill-current text-yellow-500" />
                    )}
                </div>
            </button>
        </div>
    );
}
