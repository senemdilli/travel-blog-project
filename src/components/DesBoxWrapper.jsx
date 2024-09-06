import React, { useState } from 'react';
import DestinationBox from './DestinationBox';
import ForwardButton from './ForwardButton';
import BackwardButton from './BackwardButton';
import '../css/DesBoxWrapper.css';
import { DESTINATION_DATA } from '../utils/index.js';

const DesBoxWrapper = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDestinationClick = (destination) => {
        if (selectedDestination && selectedDestination.city === destination.city) {
            setSelectedDestination(null);
        } else {
            setSelectedDestination(destination);
        }
    };

    const visibleBoxes = 3; // Number of boxes visible at one time

    const handleNext = () => {
        if (currentIndex < DESTINATION_DATA.length - visibleBoxes) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container">
            <div className="des-box-wrapper">
                {DESTINATION_DATA.slice(currentIndex, currentIndex + visibleBoxes).map((dest) => (
                    <DestinationBox 
                        key={dest.city} 
                        {...dest} 
                        onClick={() => handleDestinationClick(dest)} 
                    />
                ))}
            </div>
            <div className='arrow-buttons'>
                <BackwardButton onClick={handlePrev} />
                <ForwardButton onClick={handleNext} />
            </div>
            {selectedDestination && (
                <div className="blog-content">
                    <h2>{selectedDestination.city}</h2>
                    <p>{selectedDestination.blog}</p>
                </div>
            )}
        </div>
    );
    
};

export default DesBoxWrapper;
