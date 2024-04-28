import { useContext, useEffect, useState } from "react";
import { Context } from "../../main.jsx";
import styles from './index.module.css';
import Carousel from "../carousel/index.jsx";
import { getAllSections} from "../../api.js"; // Импорт функции для получения всех растений
import Item from "../item/index.jsx";

const Catalog = () => {
    const { userStore } = useContext(Context);
    const [items, setItems] = useState([]);
    console.log(items)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем все растения с помощью новой функции из API
                const plants = await getAllSections();
                console.log(plants)
                setItems(plants);
            } catch (error) {
                console.error('Failed to fetch plants:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Категории</h1>
            <div className={styles.category}>
                <Carousel items={items.reduce((acc, cur) =>
                    acc.includes(cur.category) ? acc : [...acc, cur.category], []).map((category) => (
                    <Item key={category} name={category} url={category} />
                ))} />
            </div>
            <h1>Рекомендации</h1>
            <div className={styles.category}>
                <Carousel items={items.sort(() => Math.random() - 0.5).slice(0, 5).map((plant) => (
                    <Item key={plant.id} {...plant} />
                ))} />
            </div>
        </div>
    );
}

export default Catalog;
