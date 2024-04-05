import React, { createContext, useState, useContext } from 'react';

export const ThemeDarkContext = createContext();

export const ThemeDarkProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Cek local storage apakah tema sudah disimpan sebelumnya
        const savedTheme = localStorage.getItem('theme');
        // Jika tidak ada tema yang disimpan, gunakan tema default (misalnya, tema terang)
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = !prevTheme;
            // Simpan tema baru ke local storage
            localStorage.setItem('theme', JSON.stringify(newTheme));
            return newTheme;
        });
    };

    return (
        <ThemeDarkContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeDarkContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeDarkContext);
};
