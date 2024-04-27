import MyPlants from "./components/myPlants/index.jsx";
import Feed from "./components/feed/index.jsx";
import Calendar from "./components/calendar/index.jsx";
import Account from "./components/account/index.jsx";
import Home from "./components/home/index.jsx";
import Catalog from "./components/catalog/index.jsx";
import AuthComponent from "./components/authComponent/index.jsx";

export const privateRoutes = [
    { path: '/my-plants', Component: MyPlants },
    { path: '/feed', Component: Feed },
    { path: '/calendar', Component: Calendar },
    { path: '/account', Component: Account },
];

export const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/catalog', Component: Catalog },
    { path: '/auth', Component: AuthComponent },
];

export const allRoutes = [...privateRoutes, ...publicRoutes];
