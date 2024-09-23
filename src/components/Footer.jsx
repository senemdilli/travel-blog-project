import React from 'react';
import '../css/Footer.css'; 

const Footer = () => { 
    return (
        <footer className='footer-wrapper'>
            <div className='footer-content'>
                <ul className='footer-list'>
                <li className='nav-item'><Link to="/">home</Link></li>
                <li className='nav-item'><Link to="/blog">blog</Link></li>
                <li className='nav-item'><Link to="/about">about</Link></li>
                </ul>
            </div>
            <p>&copy; 2024 Traveler App</p>
        </footer>
    );
};

export default Footer;
