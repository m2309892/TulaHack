import  {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import {Context} from "../../main.jsx";
import styles from './index.module.css';

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
            <Link to={{ pathname: "/addPlant"}}>
                <button>Добавить</button>
            </Link>
        </div>
    ));
};

export default ItemPage;
