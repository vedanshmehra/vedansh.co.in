import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [region, setRegion] = useState('ap-south-1');

    // Set theme based on local time
    useEffect(() => {
        const hour = new Date().getHours();
        // Day theme (light) from 6 AM to 6 PM
        if (hour >= 6 && hour < 18) {
            // Keep dark by default, but can be toggled
        }

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        const newRegion = region === 'ap-south-1' ? 'eu-west-1' : 'ap-south-1';
        setTheme(newTheme);
        setRegion(newRegion);
    };

    const value = {
        theme,
        region,
        toggleTheme,
        isDark: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
