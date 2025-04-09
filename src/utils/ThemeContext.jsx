import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({children}) {  
  const persistedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(persistedTheme || 'light');

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add("transition-none");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }

    // Remove the transition restriction after 100ms to avoid flickering
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("transition-none");
    }, 100);

    console.log("Applying Theme:", theme);

    return () => clearTimeout(transitionTimeout);
  }, [theme]);


  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>;
}

export const useThemeProvider = () => useContext(ThemeContext);