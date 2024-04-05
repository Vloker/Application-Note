// component/Theme.js
import React from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from '../../context/context';

function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            {!theme ? (
                <CiLight
                    style={{ color: 'black', cursor: 'pointer', fontSize: '40px' }}
                    onClick={toggleTheme}
                />
            ) : (
                <MdDarkMode
                    style={{ color: 'white', cursor: 'pointer', fontSize: '40px' }}
                    onClick={toggleTheme}
                />
            )}
        </div>
    );
}

export default Theme;
