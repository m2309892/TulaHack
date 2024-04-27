import Item from "../item/index.jsx";
import styles from './index.module.css';
import Carousel from "../carousel/index.jsx";

const plantsMock = [
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
const Catalog = () => {
    return (
        <div className={styles.container}>

            <h1>Категории</h1>
            <div className={styles.category}>
                <Carousel items={plantsMock.reduce((acc, cur) =>
                    acc.includes(cur.category) ? acc : [...acc, cur], []).map((plant) => (
                    <Item key={plant.id} {...plant} name={plant.category} url={plant.id}/>

                ))}/>
            </div>
            <h1>Рекомендации</h1>
            <div className={styles.category}>
                <Carousel items={plantsMock.sort(() => Math.random() - 0.5).slice(0, 5).map((plant) => (
                    <Item key={plant.id} {...plant} />
                ))}/>

            </div>
        </div>

    );
}

export default Catalog
