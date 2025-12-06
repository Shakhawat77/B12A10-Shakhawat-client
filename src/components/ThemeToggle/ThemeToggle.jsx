import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle text-xl transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <FaMoon className="text-gray-700 hover:text-blue-500" />
      ) : (
        <FaSun className="text-yellow-400 hover:text-orange-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
