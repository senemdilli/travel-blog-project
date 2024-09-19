import '../css/Navigation.css';

const Navigation = () => { 
    return (
        <nav className='nav-wrapper'>
            <div className='logo'>
                <a href='#'>Traveler App</a>
            </div>
            <ul className='nav-list'>
                <li className='nav-item'><a href='#'>Home</a></li>
                <li className='nav-item'><a href='#'>Blog</a></li>
                <li className='nav-item'><a href='#'>Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;