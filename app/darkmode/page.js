"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-toggle-switch">
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="slider round">
        <i className="fas fa-sun sun-icon"></i>
        <i className="fas fa-moon moon-icon"></i>
      </span>
    </label>
  );
};


// used https://nextui.org/docs/customization/dark-mode and https://dev.to/luisca/step-by-step-guide-to-adding-dark-mode-and-multiple-themes-to-your-nextjs-app-15lh for reference

export default ThemeToggle;
