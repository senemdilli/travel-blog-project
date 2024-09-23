import React from 'react';
import '../css/Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => { 
    return (
        <nav className='nav-wrapper'>
            <div>
                <Link className='logo' to='/'>onepack</Link>
            </div>
            <ul className='nav-list'>
                <li className='nav-item'><Link to="/">Home</Link></li>
                <li className='nav-item'><Link to="/blog">Blog</Link></li>
                <li className='nav-item'><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
