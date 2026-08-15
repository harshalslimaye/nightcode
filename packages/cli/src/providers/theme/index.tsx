import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createContext, useState, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME, THEMES } from '../../theme';
import type { ThemeColors, Theme } from '../../theme';

const CONFIG_DIR = join(homedir(), '.nightcode');
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, 'preferences.json');

type ThemePreferences = {
    themeName: string;
};

export function getInitialTheme(): Theme {
    try {
        const preferences = JSON.parse(readFileSync(THEME_PREFERENCES_PATH, 'utf-8')) as ThemePreferences;

        const savedTheme = THEMES.find(theme => theme.name === preferences.themeName);

        return savedTheme ?? DEFAULT_THEME;
    } catch (error) {
        return DEFAULT_THEME;
    }
}

function persistTheme(theme: Theme): void {
    try {
        mkdirSync(CONFIG_DIR, { recursive: true });
        const preferences: ThemePreferences = { themeName: theme.name };
        writeFileSync(THEME_PREFERENCES_PATH, JSON.stringify(preferences), 'utf-8');
    } catch (error) {
        console.error('Failed to persist theme preferences:', error);
    }
}

type ThemeContextValue = {
    colors: ThemeColors;
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => getInitialTheme());
    
    const setTheme = useCallback((theme: Theme) => {
        setCurrentTheme(theme);
        persistTheme(theme);
    }, []);

    return (
        <ThemeContext.Provider value={{ colors: currentTheme.colors, currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}