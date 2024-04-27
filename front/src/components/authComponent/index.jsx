import React, {useContext, useState} from 'react';
import { useObserver } from 'mobx-react-lite';
import {Context} from "../../main.jsx";
import {LOGIN_URL, REGISTER_URL} from "../../constants.js";

const AuthComponent = () => {
    const { userStore } = useContext(Context)
    const isLoggedIn = userStore.getLoggedIn();
    console.log(isLoggedIn)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            // Отправляем запрос на регистрацию пользователя
            await registerUser(username, password);
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
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Mock функция для регистрации пользователя
    const registerUser = async (username, password) => {
        const mockResponse = { token: 'mock-token-for-registration' };
        return mockAPIRequest(REGISTER_URL, { username, password }, mockResponse);
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

    return useObserver(() => (
        <div>
            {!isLoggedIn && (
                <div>
                    <h2>Registration</h2>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleRegister}>Register</button>
                </div>
            )}

            {isLoggedIn && (
                <div>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    ));
};

export default AuthComponent;
