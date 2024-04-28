import Item from "../item/index.jsx";
import styles from './index.module.css';
import Carousel from "../carousel/index.jsx";
import {useContext, useState} from "react";
import {Context} from "../../main.jsx";

const Catalog = () => {
    const {userStore} = useContext(Context)
    const [items, setItems] = useState(userStore.getAllPlants());
    return (
        <div className={styles.container}>

            <h1>Категории</h1>
            <div className={styles.category}>
                <Carousel items={items.reduce((acc, cur) =>
                    acc.includes(cur.category) ? acc : [...acc, cur], []).map((plant) => (
                    <Item key={plant.id} {...plant} name={plant.category} url={plant.id}/>

                ))}/>
            </div>
            <h1>Рекомендации</h1>
            <div className={styles.category}>
                <Carousel items={items.sort(() => Math.random() - 0.5).slice(0, 5).map((plant) => (
                    <Item key={plant.id} {...plant} />
                ))}/>

            </div>
        </div>

    );
}

export default Catalog
