import { useContext, useEffect, useState } from 'react';
import { Context } from '../../main.jsx';
import styles from './index.module.css';
import Carousel from '../carousel/index.jsx';
import { getAllSections } from '../../api.js';
import Item from '../item/index.jsx';

const Catalog = () => {
    const { userStore } = useContext(Context);
    const [sections, setSections] = useState([]);
    console.log('sections',sections)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем все разделы с помощью новой функции из API
                const sectionsData = await getAllSections();
                setSections(sectionsData);
            } catch (error) {
                console.error('Failed to fetch sections:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Категории</h1>
            <div className={styles.category}>
                {sections && <Carousel items={sections.map(section => (
                    <Item key={section.name} name={section.name} url={section.name} />
                ))} /> }
            </div>
            <h1>Рекомендации</h1>
            <div className={styles.category}>
                {sections && <Carousel items={sections.slice().sort(() => Math.random() - 0.5).slice(0, 5).map(section => (
                    <Item key={section.name} name={section.name} location={section.location_name} soilType={section.soil_type} />
                ))} />}
            </div>
        </div>
    );
}

export default Catalog;
