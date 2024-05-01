import { Link } from 'react-router-dom';
import homeImage from '../../assets/home-image.png';
import styles from './index.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={homeImage} alt="Home" className={styles.image} />
            </div>
            <div className={styles.texts}>
                <h1 className={styles.text}>Создай свой сад вместе со SmartGard</h1>
                <Link to="/auth" className={styles.button}>
                    Начать
                </Link>
            </div>
        </div>
    );
};

export default Home;
