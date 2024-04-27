import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import {Context} from "../../main.jsx";
import styles from './index.module.css';

const itemsMock = [
    {
        id: 1,
        category: 'Розы',
        name: 'Роза',
        image: 'https://example.com/rose.jpg',
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
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
        images: ['',''],
        plantType: 'Цветущее растение',
        climateConditions: ['Умеренный', 'Теплый'],
        soilType: 'Плодородная',
        soilAcidity: 'Нейтральная',
        description: 'Прекрасные многолетние цветы для сада или огорода.'
    }
];

const ItemPage = () => {
    const { id } = useParams();
    const {userStore} = useContext(Context);
    const item = userStore.getAllPlants().find(el => el.id === Number(id));

    if (!item) {
        return <div>Loading...</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useObserver(() => (
        <div className={styles.container}>
            <h2>{item.name}</h2>
            <div className={styles.flexContainer}>
                <div className={styles.galleryContainer}>
                    <h3>Gallery:</h3>
                    <div className={styles.imageContainer}>
                        {item.images?.map((image, index) => (
                            <div
                                key={index}
                                className={styles.image}
                                style={{ backgroundImage: `url(${'https://cvetochka.ru/upload/medialibrary/83f/imgonline-com-ua-Resize-d5cOz1B36k9q.jpg'  ||image})` }}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <h3>Description:</h3>
                    <ul>
                        <li><strong>Name:</strong> {item.name}</li>
                        <li><strong>Plant Type:</strong> {item.plantType}</li>
                        <li><strong>Climate Conditions:</strong> {item.climateConditions.join(', ')}</li>
                        <li><strong>Soil Type:</strong> {item.soilType}</li>
                        <li><strong>Soil Acidity:</strong> {item.soilAcidity}</li>
                    </ul>
                    <p>{item.description}</p>
                </div>
            </div>
            <button onClick={() => userStore.addUserPlant(item)}>Add to My Plants</button>
        </div>
    ));
};

export default ItemPage;
