import { Routes, Route, Navigate } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useContext } from 'react';
import {privateRoutes, publicRoutes} from "../../routes.js";
import {Context} from "../../main.jsx";

function AppRouter() {
    const { userStore } = useContext(Context);

    return useObserver(() => (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {userStore.isLoggedIn && (
                <>
                    {privateRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </>
            )}
            {!userStore.isLoggedIn && <Route path="*" element={<Navigate to="/auth" replace />} />}
        </Routes>
    ));
}

export default AppRouter;
