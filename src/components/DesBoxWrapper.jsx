import React, { useState } from 'react';
import DestinationBox from './DestinationBox';
import ForwardButton from './ForwardButton';
import BackwardButton from './BackwardButton';
import '../css/DesBoxWrapper.css';
import { DESTINATION_DATA } from '../utils/data.js';
import Maps from './Maps';



const DesBoxWrapper = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);

    const handleDestinationClick = (destination) => {
        if (selectedDestination && selectedDestination.city === destination.city) {
            setSelectedDestination(null);
        } else {
            setSelectedDestination(destination);
        }
    };

    const visibleBoxes = 3; // Number of boxes visible at one time

    const handleNext = () => {
        setSlideDirection('left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % DESTINATION_DATA.length);
            setSlideDirection(null); // Reset slide direction after transition
        }, 500); // Match the CSS transition time (0.5s)
    };

    const handlePrev = () => {
        setSlideDirection('right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex - 1 + DESTINATION_DATA.length) % DESTINATION_DATA.length
            );
            setSlideDirection(null); // Reset slide direction after transition
        }, 500); // Match the CSS transition time (0.5s)
    };

    const getVisibleBoxes = () => {
        if (currentIndex + visibleBoxes <= DESTINATION_DATA.length) {
            return DESTINATION_DATA.slice(currentIndex, currentIndex + visibleBoxes);
        } else {
            const endPart = DESTINATION_DATA.slice(currentIndex);
            const startPart = DESTINATION_DATA.slice(0, (currentIndex + visibleBoxes) % DESTINATION_DATA.length);
            return [...endPart, ...startPart];
        }
    };
    

    return (
        <>
            <div className="container">
                <div className={`des-box-wrapper ${slideDirection ? 'sliding' : ''}`}>
                    {getVisibleBoxes().map((dest, index) => (
                        <div 
                        key={dest.city} 
                        className={`des-box ${slideDirection === 'left' ? 'slide-left' : slideDirection === 'right' ? 'slide-right' : ''}`}>
                            <DestinationBox {...dest} onClick={() => handleDestinationClick(dest)} />
                        </div>
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
            <Maps destination={selectedDestination} />
        </>
    );
    
};

export default DesBoxWrapper;
