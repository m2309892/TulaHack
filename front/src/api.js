import axios from 'axios';

// Установка базового URL для всех запросов
axios.defaults.baseURL = 'http://example.com/api';

// Добавление Bearer токена к каждому запросу, если он доступен
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Функция для отправки запроса на добавление растения
export async function addUserPlant(plant) {
    try {
        const response = await axios.post('/addUserPlant', plant);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add plant');
    }
}

// Функция для отправки запроса на получение всех растений пользователя
export async function getAllUserPlants() {
    try {
        const response = await axios.get('/getAllUserPlants');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user plants');
    }
}

// Функция для отправки запроса на проверку статуса авторизации пользователя
export async function checkIsLoggedIn() {
    try {
        const response = await axios.get('/checkIsLoggedIn');
        return response.data.isLoggedIn;
    } catch (error) {
        throw new Error('Failed to check login status');
    }
}

// Другие функции для работы с API могут быть добавлены аналогичным образом
