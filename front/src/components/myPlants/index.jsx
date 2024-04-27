import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';

import {Context} from "../../main.jsx";
import Carousel from "../carousel/index.jsx";
import Item from "../item/index.jsx";



const MyPlants = observer(() => {
    const { userStore } = useContext(Context);
    const folders = userStore.getUserFolders();

    return (
        <>
            {folders.map(folder => (

                <div key={folder.id}>
                    <div>{`${folder.plants[folder.plants.length-1].name}`}</div>
                    <h2>{folder.name}</h2>
                    {folder.plants.length && <Carousel items={folder.plants.map(plant => (
                        <Item key={plant.id} {...plant} name={plant.name}/>
                    ))} />}
                </div>
            ))}
        </>
    );
});

export default MyPlants;
