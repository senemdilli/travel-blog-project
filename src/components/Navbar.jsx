import '../css/Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => { 
    return (
        <nav className='nav-wrapper'>
            <div>
                <a className='logo' href='#'>Traveler App</a>
            </div>
            <ul className='nav-list'>
                <li className='nav-item'><a href='/'>Home</a></li>
                <li className='nav-item'><a href='/blog'>Blog</a></li>
                <li className='nav-item'><a href='/contact'>Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;