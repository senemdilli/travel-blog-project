import React from 'react';
import '../css/DestinationBox.css';

const DestinationBox = ({ country, city, img, blog, onClick }) => {
    return (
        <div className='article' onClick={onClick}>
            <div className='assets'>
                <img src={img} />
            </div>
            <div className='content'>
                <h3 className='city-header'>{city}</h3>
                <span>{country}</span>
            </div>
        </div>
    );
};

export default DestinationBox;
