import { createContext, useContext, useState, type ReactNode } from 'react';
import { themes, type Theme, type ThemeName } from '../themes';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('arcadeNeon');

  const toggleTheme = () => {
    setThemeName((current) =>
      current === 'arcadeNeon' ? 'retroJapanese' : 'arcadeNeon'
    );
  };

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName],
        themeName,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
