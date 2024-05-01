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

export async function registerUser(login, password) {
    try {
        const response = await axios.post('/registration', { login, password });
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

export async function loginUser(username, password) {
    try {
        const response = await axios.post('/login', `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        });
        localStorage.setItem('token',response.data.access_token);
        return response.data;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}

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
export async function getSection() {
    try {
        const response = await axios.get(`/general/section`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch section data');
    }
}

export async function getPlantsBySection(sectionId, ) {
    try {
        const response = await axios.get(
            `http://itut.itatmisis.ru:8000/general/section/${sectionId}/collection-plant`,
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTQ4ODIwODV9.uVXG0S-yMYot4p-p1ZDZcc9iqzUfAYeL3pmpdUi5pC4',
                    'accept': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch section collection');
    }
}
export async function getPlantById(sectionId, plantId) {
    const url = `http://itut.itatmisis.ru:8000/general/section/${sectionId}/collection-plant/${plantId}`;
    const token = localStorage.getItem('token');
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch plant data');
    }
}
export async function addPlantToCollection(sectionId, plants) {
    const url = `http://itut.itatmisis.ru:8000/general/section/${sectionId}/collection-plant`;
    const token = localStorage.getItem('token');
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, plants, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add plant to collection');
    }
}

export const addPlant = async (plantData, token) => {
    try {
        const response = await axios.post(
            'http://itut.itatmisis.ru:8000/general/plant',
            plantData,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to add plant:', error);
    }
};

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

export const aiHelp = async (query) => {
    try {
        const response = await axios.get('http://itut.itatmisis.ru:8000/general/ai-hint', {
            params: { query },
            headers: { 'Accept': 'application/json' }
        });

        return response.data.answer;
    } catch (error) {
        console.error('Failed to fetch AI hint:', error);
        return 'Sorry, something went wrong. Please try again later.';
    }
};



