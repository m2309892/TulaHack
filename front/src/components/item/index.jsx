import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './index.module.css';
import {Context} from "../../main.jsx";

const Item = ({ id, name, image, url = '', isTall = false }) => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = () => {
        if (url === '') {
            navigate(`/plant/${id}`);
        } else {
            navigate(`/category/${url}`);
        }
    };

    const handleAdd = () => {
        const plants = userStore.getAllUserPlants();
        if (!plants.find(el=>el.id === id)) {

            userStore.addUserPlant({id, name, image})
        }
        console.log(plants)
    }
    if (isTall) {
        return (
            <div className={styles.tallItem}>
                <div
                    className={cn(styles.item, {[styles.tallItemImage]: isTall})}
                    style={{backgroundImage: `url(${'https://cvetochka.ru/upload/medialibrary/83f/imgonline-com-ua-Resize-d5cOz1B36k9q.jpg' || image})`}}
                    onClick={handleClick}
                    key={id}
                />
                <div className={styles.tallContent}>
                    <h3>{name}</h3>
                    <button className={styles.addButton} onClick={handleAdd}>Добавить
                    </button>
                </div>
            </div>

        );
    }
    return (
        <div
            className={styles.item}
            style={{backgroundImage: `url(${'https://cvetochka.ru/upload/medialibrary/83f/imgonline-com-ua-Resize-d5cOz1B36k9q.jpg' || image})`}}
            onClick={handleClick}
            key={id}
        >
            <span>{name}</span>

        </div>
    );
};

export default Item;
