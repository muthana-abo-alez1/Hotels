import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from 'Theme'; 
import { getTheme, setTheme } from 'utils/themeUtils';

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper');
  }
  return context;
};

export const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const savedTheme = getTheme();
  const initialTheme = savedTheme === 'dark' ? true : false;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialTheme);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      setTheme(newMode ? 'dark' : 'light'); 
      return newMode;
    });
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
