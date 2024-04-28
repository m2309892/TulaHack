import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main.jsx';
import styles from './index.module.css';
import {useLocation, useNavigate} from "react-router-dom";

const AddPlantForm = observer(() => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate();
    const {state} = useLocation();
    const { folderId, folderName } =state || {}; // Получение параметров из location.state
    console.log('here ',state)
    const initialValues = {
        customName: '',
        folderId: folderId || '',
        plantingDate: '',
        lastWateringDate: ''
    };

    const handleSubmit = async (values, { resetForm }) => {
        // Проверяем, существует ли папка с таким названием
        let folder = userStore.getUserFolders().find(folder => folder.name === values.folderId);
        if (!folder) {
            // Если папка не существует, генерируем уникальный ID
            const uniqueId = generateUniqueId();
            folder = { id: uniqueId, name: values.folderId, plants: [] };
            // Добавляем новую папку
            userStore.addUserFolder(folder);
        }
        // Добавление растения в хранилище с указанием folderId
        userStore.addUserPlant({
            name: values.customName,
            folderId: folder.id, // Передача folderId
            plantingDate: values.plantingDate,
            lastWateringDate: values.lastWateringDate
        });
        navigate('/my-plants');
        resetForm();
    };

    // Функция для генерации уникального ID
    const generateUniqueId = () => {
        let id;
        do {
            id = Math.floor(Math.random() * 1000000);
        } while (userStore.getUserFolders().some(folder => folder.id === id));
        return id;
    };

    return (
        <div className={styles.container}>
            <h2>Add Plant</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <div className={styles.imageContainer}>
                        {/* Фото растения */}
                        <img src="plant_image.jpg" alt="Plant" className={styles.plantImage} />
                    </div>
                    <div className={styles.formContainer}>
                        <Field type="text" name="customName" placeholder="Custom Name" className={styles.input} />
                        <Field type="text" name="folderId" placeholder={`${folderName || 'Folder Name'}`} className={styles.input} />
                        <Field type="date" name="plantingDate" className={styles.input} />
                        <Field type="date" name="lastWateringDate" className={styles.input} />
                        <button type="submit" className={styles.button}>Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
});

export default AddPlantForm;
