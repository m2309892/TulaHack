// store/userStore.js
import { makeAutoObservable } from 'mobx';

class UserStore {
    userPlants = []; // Здесь будут храниться растения пользователя
    isLoggedIn = false; // Статус авторизации пользователя

    constructor() {
        makeAutoObservable(this);
        this.checkIsLoggedIn(); // Проверяем авторизацию при инициализации стора
    }

    // Добавить растение пользователя в хранилище
    addUserPlant(plant) {
        this.userPlants.push(plant);
    }

    // Получить список всех растений пользователя
    getAllUserPlants() {
        return this.userPlants;
    }

    // Метод для проверки авторизации пользователя
    checkIsLoggedIn() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const { isLoggedIn } = JSON.parse(userData);
            this.isLoggedIn = isLoggedIn;
        }
    }

    // Метод для установки статуса авторизации
    setLoggedIn(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        localStorage.setItem('userData', JSON.stringify({ isLoggedIn }));
    }
    getLoggedIn() {
        return this.isLoggedIn
    }
}

export default UserStore;
