import SunIcon from "../icons/sun";
import MoonIcon from "../icons/moon";
import { useTheme } from "../utils/theme";
import { trackClarityEvent } from "../../utils/clarity";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    trackClarityEvent(`theme-toggle-${newTheme}`);
    toggleTheme();
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-0"
      aria-label="Toggle theme"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
