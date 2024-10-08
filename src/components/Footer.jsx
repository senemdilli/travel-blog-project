import React from 'react';
import '../css/Footer.css'; 
import { Link } from "react-router-dom";

const Footer = () => { 
    return (
        <footer className='footer-wrapper'>
            <div className='footer-content'>
                <ul className='footer-list'>
                <li className='footer-item'><Link to="/">home</Link></li>
                <li className='footer-item'><Link to="/blog">blog</Link></li>
                <li className='footer-item'><Link to="/about">about</Link></li>
                </ul>
            </div>
            <p>&copy; 2024 onepack.club</p>
        </footer>
    );
};

export default Footer;
