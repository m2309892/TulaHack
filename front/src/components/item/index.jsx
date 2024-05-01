import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Context } from '../../main.jsx';
import { addPlantToCollection, getPlantById } from '../../api.js';
import styles from './index.module.css';

const Item = ({ id, folderId, isTall = false }) => {
    const { userStore } = useContext(Context);
    const [data, setData] = useState({});
    const [addText, setAddText] = useState('Добавить');
    const navigate = useNavigate();
    console.log('data',data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const plantData = await getPlantData();
                setData(plantData);
            } catch (error) {
                console.error('Failed to fetch plant data:', error);
            }
        };

        fetchData();
    }, []);

    const getPlantData = async () => {
        return await getPlantById(folderId, id);
    };

    const handleClick = () => {
        if (data?.url === '') {
            navigate(`/plant/${id}`);
        } else {
            navigate(`/category/${data?.url}`);
        }
    };

    const handleAdd = async () => {
        const plants = userStore.getAllUserPlants();
        if (!plants.find((el) => el.id === id)) {
            try {
                await addPlantToCollection(folderId, [{ id: 1, name: data?.name, image: data?.image }]);
                setAddText('Добавлено!');
            } catch (error) {
                console.error('Failed to add plant to collection:', error);
            }
        }
    };

    if (isTall) {
        return (
            <div className={styles.tallItem}>
                <div
                    className={cn(styles.item, { [styles.tallItemImage]: isTall })}
                    style={{ backgroundImage: `url(${data?.image || 'https://cvetochka.ru/upload/medialibrary/83f/imgonline-com-ua-Resize-d5cOz1B36k9q.jpg'})` }}
                    onClick={handleClick}
                    key={id}
                />
                <div className={styles.tallContent}>
                    <h3>{data?.nickname}</h3>
                    <button className={styles.addButton} onClick={handleAdd}>
                        {addText}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles.item}
            style={{ backgroundImage: `url(${data?.image || 'https://cvetochka.ru/upload/medialibrary/83f/imgonline-com-ua-Resize-d5cOz1B36k9q.jpg'})` }}
            onClick={handleClick}
            key={id}
        >
            <span>{data?.nickname}</span>
        </div>
    );
};

export default Item;
