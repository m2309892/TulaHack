import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Item from "../item/index.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";

const Category = observer(() => {
    const {userStore} = useContext(Context)
    const { id } = useParams(); // Получаем параметр id из URL
    const [category, setCategory] = useState('error');
    const [items, setItems] = useState(userStore.getAllPlants());

    useEffect(() => {
        const selectedItem = userStore.getAllPlants().find(item => item.id === parseInt(id));

        if (selectedItem) {
            setCategory(selectedItem.category);
        }
    }, [id]);

    return (
        <div style={{marginLeft:'40px'}}>
            <h2>Category: {category}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {items
                    .filter(item => item.category === category)
                    .map(item => (
                        <Item key={item.id} {...item} isTall />
                    ))}
            </div>
        </div>
    );
});

export default Category;
