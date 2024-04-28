import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main.jsx';
import styles from './index.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import {addPlant} from "../../api.js";

const AddPlantForm = observer(() => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { folderId, folderName } = state || {};

    const initialValues = {
        customName: '',
        folderId: folderId || '',
        plantingDate: '',
        lastWateringDate: ''
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await addPlant(values, userStore.getToken());
            navigate('/my-plants');
            resetForm();
        } catch (error) {
            console.error('Failed to add plant:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add Plant</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <div className={styles.imageContainer}>
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
