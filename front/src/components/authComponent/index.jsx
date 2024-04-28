import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../../main.jsx";
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api.js"; // Импорт функций для регистрации и входа пользователя

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
            navigate(`/catalog`);
        } catch (error) {
            console.error('Login failed:', error);
            userStore.setLoggedIn(false);
        }
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
