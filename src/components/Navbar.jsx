import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Assuming your CSS file is in this location

const Navbar = () => {
    // State to toggle mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle function to open/close mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-wrapper">
            <Link className="logo" to="/">onepack</Link>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <div className={isMenuOpen ? 'line open' : 'line'}></div>
                <div className={isMenuOpen ? 'line open' : 'line'}></div>
                <div className={isMenuOpen ? 'line open' : 'line'}></div>
            </div>

            {/* Navigation List */}
            <ul className={isMenuOpen ? 'nav-list nav-list-mobile open' : 'nav-list'}>
                <li className="nav-item">
                    <Link to="/" onClick={isMenuOpen ? toggleMenu : undefined}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/blog" onClick={isMenuOpen ? toggleMenu : undefined}>Blog</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" onClick={isMenuOpen ? toggleMenu : undefined}>About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/assistant" onClick={isMenuOpen ? toggleMenu : undefined}>Assistant</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
