import React from 'react';
import arrowIcon from '../svg/arrow_back.svg'; 
import '../css/ArrowButton.css';

const BackwardButton = ({onClick}) => {
    return (
        <button className="arrow-button" onClick={onClick}>
            <img src={arrowIcon} alt="Forward Arrow" className="arrow-icon" />
        </button>
    );
}

export default BackwardButton;