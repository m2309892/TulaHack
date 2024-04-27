import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/home-image.jpg';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to Our Website</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={homeImage} alt="Home" style={{ width: '50%', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
            </div>
            <Link to="/auth" style={{ marginTop: '20px', textDecoration: 'none', backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
                Get Started
            </Link>
        </div>
    );
};

export default Home;
