import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Context } from "../../main.jsx";
import Carousel from "../carousel/index.jsx";
import Item from "../item/index.jsx";
import { getPlantsBySection, getSection } from "../../api.js";
import styles from './index.module.css';

const MyPlants = observer(() => {
    const { userStore } = useContext(Context);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedFolders = await getSection() || userStore.getUserFolders();
                setFolders(fetchedFolders);
            } catch (error) {
                console.error('Failed to fetch folders:', error);
            }
        };

        fetchData();
    }, [userStore]);

    const [plantsBySection, setPlantsBySection] = useState({});

    useEffect(() => {
        const fetchPlantsForAllSections = async () => {
            const plantsData = {};
            for (const folder of folders) {
                try {
                    const plants = await getPlantsBySection(folder.id);
                    plantsData[folder.id] = plants;
                } catch (error) {
                    console.error(`Failed to fetch plants for section ${folder.id}:`, error);
                    plantsData[folder.id] = [];
                }
            }
            setPlantsBySection(plantsData);
        };

        fetchPlantsForAllSections();
    }, [folders]);

    return (
        <>
            {folders.map(folder => (
                <div key={folder.id} className={styles.folder}>
                    <div>
                        <div className={styles.texts}>
                            <h2>{folder.name}</h2>
                            <Link to={{ pathname: "/addPlant", state: { folderId: folder.id, folderName: folder.name } }}>
                                <button>+</button>
                            </Link>
                        </div>
                        {plantsBySection[folder.id] && plantsBySection[folder.id].length > 0 && (
                            <Carousel items={plantsBySection[folder.id].map(plant => (
                                <Item key={plant.id} {...plant} name={plant.name } folderId={folder.id} />
                            ))} />
                        )}
                    </div>
                </div>
            ))}
        </>
    );
});

export default MyPlants;
