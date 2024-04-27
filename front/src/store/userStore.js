import { makeAutoObservable } from 'mobx';

class UserStore {
    userPlants = []; // Здесь будут храниться растения пользователя
    isLoggedIn = false; // Статус авторизации пользователя
    allPlants = [
        {
            id: 1,
            category: 'Розы',
            name: 'Роза',
            image: 'https://example.com/rose.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Теплый'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Прекрасное цветущее растение для сада или дома.'
        },
        {
            id: 2,
            category: 'Папоротники',
            name: 'Папоротник',
            image: 'https://example.com/fern.jpg',
            plantType: 'Декоративное растение',
            climateConditions: ['Влажный', 'Тенистый'],
            soilType: 'Влажная',
            soilAcidity: 'Кислая',
            description: 'Популярное декоративное растение для интерьера.'
        },
        {
            id: 3,
            category: 'Луковичные',
            name: 'Гиацинт',
            image: 'https://example.com/hyacinth.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Холодный'],
            soilType: 'Песчаная',
            soilAcidity: 'Кислая',
            description: 'Очаровательное цветущее растение с приятным ароматом.'
        },
        {
            id: 4,
            category: 'Ароматические',
            name: 'Лаванда',
            image: 'https://example.com/lavender.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Теплый', 'Сухой'],
            soilType: 'Глинистая',
            soilAcidity: 'Нейтральная',
            description: 'Популярное ароматическое растение для сада или кухни.'
        },
        {
            id: 5,
            category: 'Экзотические',
            name: 'Орхидея',
            image: 'https://example.com/orchid.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Элегантное цветущее растение с уникальными цветами.'
        },
        {
            id: 6,
            category: 'Суккуленты',
            name: 'Кактус',
            image: 'https://example.com/cactus.jpg',
            plantType: 'Суккулент',
            climateConditions: ['Жаркий', 'Сухой'],
            soilType: 'Песчаная',
            soilAcidity: 'Нейтральная',
            description: 'Стойкое и легкое в уходе растение для сухих климатических условий.'
        },
        {
            id: 7,
            category: 'Суккуленты',
            name: 'Суккулент',
            image: 'https://example.com/succulent.jpg',
            plantType: 'Суккулент',
            climateConditions: ['Теплый', 'Сухой'],
            soilType: 'Песчаная',
            soilAcidity: 'Нейтральная',
            description: 'Красивое растение с восковыми листьями, идеальное для домашнего озеленения.'
        },
        {
            id: 8,
            category: 'Суккуленты',
            name: 'Алоэ',
            image: 'https://example.com/aloe.jpg',
            plantType: 'Суккулент',
            climateConditions: ['Умеренный', 'Сухой'],
            soilType: 'Песчаная',
            soilAcidity: 'Нейтральная',
            description: 'Легко растущее растение, известное своими лечебными свойствами.'
        },
        {
            id: 9,
            category: 'Экзотические',
            name: 'Антуриум',
            image: 'https://example.com/anthurium.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Экзотическое растение с необычными цветами и листьями.'
        },
        {
            id: 10,
            category: 'Лиственные',
            name: 'Фикус',
            image: 'https://example.com/ficus.jpg',
            plantType: 'Декоративное растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Популярное декоративное растение с красивыми листьями.'
        },
        {
            id: 11,
            category: 'Суккуленты',
            name: 'Молочай',
            image: 'https://example.com/euphorbia.jpg',
            plantType: 'Суккулент',
            climateConditions: ['Жаркий', 'Сухой'],
            soilType: 'Песчаная',
            soilAcidity: 'Нейтральная',
            description: 'Растение с необычной формой и красивыми цветами.'
        },
        {
            id: 12,
            category: 'Цветущие',
            name: 'Азалия',
            image: 'https://example.com/azalea.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Кислая',
            soilAcidity: 'Кислая',
            description: 'Прекрасное цветущее растение для сада или интерьера.'
        },
        {
            id: 13,
            category: 'Цветущие',
            name: 'Хризантема',
            image: 'https://example.com/chrysanthemum.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Популярное цветущее растение для сада или букетов.'
        },
        {
            id: 14,
            category: 'Цветущие',
            name: 'Гербера',
            image: 'https://example.com/gerbera.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Яркое и красочное цветущее растение для сада или дома.'
        },
        {
            id: 15,
            category: 'Суккуленты',
            name: 'Каланхоэ',
            image: 'https://example.com/kalanchoe.jpg',
            plantType: 'Суккулент',
            climateConditions: ['Умеренный', 'Сухой'],
            soilType: 'Песчаная',
            soilAcidity: 'Нейтральная',
            description: 'Небольшое и красивое растение с яркими цветами.'
        },
        {
            id: 16,
            category: 'Цветущие',
            name: 'Пелинобус',
            image: 'https://example.com/pelargonium.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Сухой'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Прекрасное цветущее растение для сада или балкона.'
        },
        {
            id: 17,
            category: 'Цветущие',
            name: 'Сенполия',
            image: 'https://example.com/saintpaulia.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Влажный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Изящное цветущее растение для украшения интерьера.'
        },
        {
            id: 18,
            category: 'Луковичные',
            name: 'Тюльпан',
            image: 'https://example.com/tulip.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Холодный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Изысканное цветущее растение для украшения сада или букетов.'
        },
        {
            id: 19,
            category: 'Луковичные',
            name: 'Крокус',
            image: 'https://example.com/crocus.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Холодный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Милые маленькие цветы для весеннего сада или балкона.'
        },
        {
            id: 20,
            category: 'Луковичные',
            name: 'Нарцисс',
            image: 'https://example.com/narcissus.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Холодный'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Яркие и ароматные цветы для украшения сада или букетов.'
        },
        {
            id: 21,
            category: 'Луковичные',
            name: 'Ирис',
            image: 'https://example.com/iris.jpg',
            plantType: 'Цветущее растение',
            climateConditions: ['Умеренный', 'Теплый'],
            soilType: 'Плодородная',
            soilAcidity: 'Нейтральная',
            description: 'Прекрасные многолетние цветы для сада или огорода.'
        }
    ]; // мок растений
    folders = [
        { id: 1, name: 'Папка 1', plants:[{
                id: 1,
                category: 'Розы',
                name: 'Роза',
                image: 'https://example.com/rose.jpg',
                plantType: 'Цветущее растение',
                climateConditions: ['Умеренный', 'Теплый'],
                soilType: 'Плодородная',
                soilAcidity: 'Нейтральная',
                description: 'Прекрасное цветущее растение для сада или дома.'
            },
                {
                    id: 2,
                    category: 'Папоротники',
                    name: 'Папоротник',
                    image: 'https://example.com/fern.jpg',
                    plantType: 'Декоративное растение',
                    climateConditions: ['Влажный', 'Тенистый'],
                    soilType: 'Влажная',
                    soilAcidity: 'Кислая',
                    description: 'Популярное декоративное растение для интерьера.'
                },]},
        { id: 2, name: 'Папка 2',plants:[{
                id: 1,
                category: 'Розы',
                name: 'Роза',
                image: 'https://example.com/rose.jpg',
                plantType: 'Цветущее растение',
                climateConditions: ['Умеренный', 'Теплый'],
                soilType: 'Плодородная',
                soilAcidity: 'Нейтральная',
                description: 'Прекрасное цветущее растение для сада или дома.'
            },
                {
                    id: 2,
                    category: 'Папоротники',
                    name: 'Папоротник',
                    image: 'https://example.com/fern.jpg',
                    plantType: 'Декоративное растение',
                    climateConditions: ['Влажный', 'Тенистый'],
                    soilType: 'Влажная',
                    soilAcidity: 'Кислая',
                    description: 'Популярное декоративное растение для интерьера.'
                },{
                    id: 1,
                    category: 'Розы',
                    name: 'Роза',
                    image: 'https://example.com/rose.jpg',
                    plantType: 'Цветущее растение',
                    climateConditions: ['Умеренный', 'Теплый'],
                    soilType: 'Плодородная',
                    soilAcidity: 'Нейтральная',
                    description: 'Прекрасное цветущее растение для сада или дома.'
                },
                {
                    id: 2,
                    category: 'Папоротники',
                    name: 'Папоротник',
                    image: 'https://example.com/fern.jpg',
                    plantType: 'Декоративное растение',
                    climateConditions: ['Влажный', 'Тенистый'],
                    soilType: 'Влажная',
                    soilAcidity: 'Кислая',
                    description: 'Популярное декоративное растение для интерьера.'
                },] },

    ];

    constructor() {
        makeAutoObservable(this);
        this.checkIsLoggedIn(); // Проверяем авторизацию при инициализации стора
    }

    // Добавить растение пользователя в хранилище
    addUserPlant(plant) {
        this.userPlants.push(plant);
        const folderIndex = this.folders.findIndex(folder => folder.id === plant.folderId);
        console.table(folderIndex,this.folders.map(el=>el.id),plant)
        if (folderIndex !== -1) {
            // Если папка найдена, обновить её список растений
            this.folders[folderIndex].plants.push(plant);
        } else {
            // Если папка не найдена, создать новую папку и добавить растение в её список растений
            const newFolder = { id: this.folders.length + 1, name: `Папка ${this.folders.length + 1}`, plants: [plant] };
            this.folders.push(newFolder);
        }
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

    // Получить список всех растений
    getAllPlants() {
        return this.allPlants;
    }

    // Установить список всех растений
    setAllPlants(plants) {
        this.allPlants = plants;
    }

    // Получить список папок пользователя
    getUserFolders() {
        return this.folders;
    }

    // Добавить папку пользователя
    addUserFolder(folder) {
        this.folders.push(folder);
    }
}

export default UserStore;
