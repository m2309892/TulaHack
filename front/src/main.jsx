import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import UserStore from './store/userStore'; // Импортируем только UserStore
import AppRouter from "./components/appRouter/index.jsx";
import './index.css';
export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{ userStore: new UserStore() }}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Context.Provider>
);
