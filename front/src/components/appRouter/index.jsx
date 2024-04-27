import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "../navbar/index.jsx";
import {privateRoutes, publicRoutes} from "../../routes.js";

const AppRouter = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Состояние для хранения текущей темы

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme); // Изменяем текущую тему на противоположную
    };

    return (
        <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}> {/* Применяем класс в зависимости от текущей темы */}
            <Navbar toggleTheme={toggleTheme} /> {/* Передаем функцию для переключения темы в навигационный бар */}
            <Routes>
                {privateRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        </div>
    );
};

export default AppRouter;
