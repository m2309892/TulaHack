import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'; // Импорт Link из react-router-dom
import { Context } from "../../main.jsx";
import Carousel from "../carousel/index.jsx";
import Item from "../item/index.jsx";
import styles from './index.module.css'
const MyPlants = observer(() => {
    const { userStore } = useContext(Context);
    const folders = userStore.getUserFolders();

    return (
        <>
            {folders.map(folder => (
                <div key={folder.id} className={styles.folder}>
                    <div>
                        <div className={styles.texts}>
                            <h2>{folder.name}</h2>

                            <Link to={{pathname: "/addPlant", state: {folderId: folder.id, folderName: folder.name}}}>
                                <button>+</button>
                            </Link>
                        </div>
                        {folder.plants.length > 0 && (
                            <Carousel items={folder.plants.map(plant => (
                                <Item key={plant.id} {...plant} name={plant.name}/>
                            ))} />
                        )}
                    </div>
                </div>
            ))}
        </>
    );
});

export default MyPlants;
