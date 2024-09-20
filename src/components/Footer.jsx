import '../css/Footer.css'; 

const Footer = () => { 
    return (
        <footer className='footer-wrapper'>
            <div className='footer-content'>
                <ul className='footer-list'>
                    <li className='footer-item'><a href='#'>home</a></li>
                    <li className='footer-item'><a href='#'>blog</a></li>
                    <li className='footer-item'><a href='#'>contact</a></li>
                </ul>
            </div>
            <p>&copy; 2024 Traveler App</p>
        </footer>
    );
};

export default Footer;