/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: null,
  themeChangeHandler: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme;
  });

  useEffect(() => {
    if (theme === null) {
      // verificar si el tema no se ha guardado previamente
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [theme]);

  // useEffect(() => {
  //   const element = document.documentElement;
  //   if (theme === "dark") {
  //     element.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     element.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [theme]);

  const themeChangeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, themeChangeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};