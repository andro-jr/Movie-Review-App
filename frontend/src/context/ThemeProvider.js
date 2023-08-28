import React, { createContext, useEffect } from 'react';

export const ThemeContext = createContext();

const defautTheme = 'light';
const darkTheme = 'dark';

const getTheme = () => {
  return localStorage.getItem('theme');
};

const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) document.documentElement.classList.remove(themeToRemove);
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
};

const ThemeProvider = ({ children }) => {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = oldTheme === defautTheme ? darkTheme : defautTheme;

    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) {
      updateTheme(defautTheme);
    } else updateTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
