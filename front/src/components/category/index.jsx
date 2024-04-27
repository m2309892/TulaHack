import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../item/index.jsx";

const itemsMock = [
    { id: 1, category: 'Розы', name: 'Роза', image: 'https://example.com/rose.jpg' },
    { id: 2, category: 'Папоротники', name: 'Папоротник', image: 'https://example.com/fern.jpg' },
    { id: 3, category: 'Луковичные', name: 'Гиацинт', image: 'https://example.com/hyacinth.jpg' },
    { id: 4, category: 'Ароматические', name: 'Лаванда', image: 'https://example.com/lavender.jpg' },
    { id: 5, category: 'Экзотические', name: 'Орхидея', image: 'https://example.com/orchid.jpg' },
    { id: 6, category: 'Суккуленты', name: 'Кактус', image: 'https://example.com/cactus.jpg' },
    { id: 7, category: 'Суккуленты', name: 'Суккулент', image: 'https://example.com/succulent.jpg' },
    { id: 8, category: 'Суккуленты', name: 'Алоэ', image: 'https://example.com/aloe.jpg' },
    { id: 9, category: 'Экзотические', name: 'Антуриум', image: 'https://example.com/anthurium.jpg' },
    { id: 10, category: 'Лиственные', name: 'Фикус', image: 'https://example.com/ficus.jpg' },
    { id: 11, category: 'Суккуленты', name: 'Молочай', image: 'https://example.com/euphorbia.jpg' },
    { id: 12, category: 'Цветущие', name: 'Азалия', image: 'https://example.com/azalea.jpg' },
    { id: 13, category: 'Цветущие', name: 'Хризантема', image: 'https://example.com/chrysanthemum.jpg' },
    { id: 14, category: 'Цветущие', name: 'Гербера', image: 'https://example.com/gerbera.jpg' },
    { id: 15, category: 'Суккуленты', name: 'Каланхоэ', image: 'https://example.com/kalanchoe.jpg' },
    { id: 16, category: 'Цветущие', name: 'Пелинобус', image: 'https://example.com/pelargonium.jpg' },
    { id: 17, category: 'Цветущие', name: 'Сенполия', image: 'https://example.com/saintpaulia.jpg' },
    { id: 18, category: 'Луковичные', name: 'Тюльпан', image: 'https://example.com/tulip.jpg' },
    { id: 19, category: 'Луковичные', name: 'Крокус', image: 'https://example.com/crocus.jpg' },
    { id: 20, category: 'Луковичные', name: 'Нарцисс', image: 'https://example.com/narcissus.jpg' },
    { id: 21, category: 'Луковичные', name: 'Ирис', image: 'https://example.com/iris.jpg' }
];
const Category = () => {
    const { id } = useParams(); // Получаем параметр id из URL
    const [category, setCategory] = useState('error');
    //const [items, setItems] = useState([]);

    useEffect(() => {
        // Здесь можно сделать запрос на сервер для получения информации по id
        const selectedItem = itemsMock.find(item => item.id === parseInt(id));
        //console.log(selectedItem,id)
        if (selectedItem) {
            setCategory(selectedItem.category);
        }
    }, [id]);
    console.log(category)
    return (
        <div>
            <h2>Category: {category}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {itemsMock
                    .filter(item => item.category === category)
                    .map(item => (
                        <Item key={item.id} {...item} isTall />
                    ))}
            </div>
        </div>
    );
};

export default Category;
