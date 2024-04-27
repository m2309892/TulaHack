import {LOGIN_URL, REGISTER_URL} from "../../constants.js";

import { useContext, useState } from 'react';
import {observer, useObserver} from 'mobx-react-lite';
import { Context } from "../../main.jsx";
import styles from './index.module.css';
import {useNavigate} from "react-router-dom";

const AuthComponent = observer(() => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate();
    const isLoggedIn = userStore.getLoggedIn();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegister = async () => {
        try {
            // Отправляем запрос на регистрацию пользователя
            await registerUser(username, password, firstName, lastName);
            // Устанавливаем статус авторизации в true
            userStore.setLoggedIn(true);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleLogin = async () => {
        try {
            // Отправляем запрос на вход пользователя
            await loginUser(username, password);
            userStore.setLoggedIn(true);
            console.log('logged in ')
            navigate(`/catalog`);

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Mock функция для регистрации пользователя
    const registerUser = async (username, password, firstName, lastName) => {
        const mockResponse = { token: 'mock-token-for-registration' };
        return mockAPIRequest(REGISTER_URL, { username, password, firstName, lastName }, mockResponse);
    };

    // Mock функция для входа пользователя
    const loginUser = async (username, password) => {
        const mockResponse = { token: 'mock-token-for-login' };
        return mockAPIRequest(LOGIN_URL, { username, password }, mockResponse);
    };

    // Mock API запрос
    const mockAPIRequest = async (url, data, responseData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() < 0.8; // Симуляция 80% успешности запроса
                if (success) {
                    resolve(responseData);
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            }, 1000);
        });
    };

    return (
        <div className={styles.authContainer}>
            {!isLoggedIn && (
                <div className={styles.authForm}>
                    <h2>Registration</h2>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className={styles.input} />
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className={styles.input} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className={styles.input} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
                    <button onClick={handleRegister} className={styles.button}>Register</button>
                </div>
            )}

            {isLoggedIn && (
                <div className={styles.authForm}>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className={styles.input} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
                    <button onClick={handleLogin} className={styles.button} disabled={! (password && username)}>Login</button>
                </div>
            )}
        </div>
    );
});

export default AuthComponent;
