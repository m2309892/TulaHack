import axios from 'axios';

axios.defaults.baseURL = 'http://itut.itatmisis.ru:8000';

// Добавление Bearer токена к каждому запросу, если он доступен
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`;

    return config;
}, error => {
    return Promise.reject(error);
});

// Функция для отправки POST-запроса на регистрацию пользователя
export async function registerUser(login, password) {
    try {
        const response = await axios.post('/registration', { login, password });
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

// Функция для отправки POST-запроса на вход пользователя
export async function loginUser(username, password) {
    try {
        const response = await axios.post('/login', `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        });
        //console.log(response.data.access_token)
        localStorage.setItem('token',response.data.access_token);
        return response.data;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}

// Функция для отправки GET-запроса на получение всех разделов
export async function getAllSections() {
    try {
        const response = await axios.get('/general/section-all', {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all sections');
    }
}

// Функция для отправки GET-запроса на получение всех растений
export async function getAllPlants() {
    try {
        const response = await axios.get('/general/plant', {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all plants');
    }
}

// Функция для отправки GET-запроса на получение данных о конкретном растении по его ID
export async function getPlantById(plantId) {
    try {
        const response = await axios.get(`/general/plant/${plantId}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch plant data');
    }
}


