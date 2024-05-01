import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../../assets/logo.png'
import styles from './index.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="Logo"/>
            </Link>
            <ul className={styles.navLinks}>
                <li><Link to="/" className={styles.navLink}>Главная</Link></li>
                <li><Link to="/my-plants" className={styles.navLink}>Мои растения</Link></li>
                <li><Link to="/catalog" className={styles.navLink}>Каталог</Link></li>
                <li><Link to="/calendar" className={styles.navLink}>Календарь</Link></li>
                <li><Link to="/help" className={styles.navLink}>Помощь</Link></li>
            </ul>
            <Link to="/account" className={styles.userIcon}>
                <AiOutlineUser/>
            </Link>
        </nav>
    );
};

export default Navbar;
