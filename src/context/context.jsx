import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const ThemeDarkContext = createContext();

export const ThemeDarkProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = !prevTheme;
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

ThemeDarkProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useTheme = () => {
    return useContext(ThemeDarkContext);
};
