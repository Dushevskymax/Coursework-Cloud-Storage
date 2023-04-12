import React from 'react';
import '../dark/moon.css';
import '../light/sun.css';
import cl from './ThemeItem.module.css';

const ThemeItem = ({theme, changeTheme}) => {
    return (
        <div className={cl.theme} onClick={() => changeTheme(!theme)}>
            <i className={theme ? "gg_sun" : "gg_moon"}></i>
        </div>
    )
};

export default ThemeItem;