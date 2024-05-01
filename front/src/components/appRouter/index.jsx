import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "../navbar/index.jsx";
import {privateRoutes, publicRoutes} from "../../routes.js";

const AppRouter = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
            <Navbar toggleTheme={toggleTheme} />
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
