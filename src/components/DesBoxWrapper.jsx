import React, { useState, useRef, useEffect } from 'react';
import DestinationBox from './DestinationBox';
import ForwardButton from './ForwardButton';
import BackwardButton from './BackwardButton';
import '../css/DesBoxWrapper.css';
import { DESTINATION_DATA } from '../utils/data.js';
import Maps from './Maps';

const DesBoxWrapper = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    //const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);

    const visibleBoxes = 3; // Number of boxes visible at one time
    const scrollAmount = 3; // Scroll 3 boxes at a time

    const handleDestinationClick = (destination) => {
        if (selectedDestination && selectedDestination.city === destination.city) {
            setSelectedDestination(null);
        } else {
            setSelectedDestination(destination);
        }
    };

    // const handleNext = () => {
    //     setSlideDirection('left');
    //     setTimeout(() => {
    //         setCurrentIndex((prevIndex) => 
    //             (prevIndex + scrollAmount) % DESTINATION_DATA.length
    //         );
    //         setSlideDirection(null); // Reset slide direction after transition
    //     }, 500); // Match the CSS transition time (0.5s)
    // };

    // const handlePrev = () => {
    //     setSlideDirection('right');
    //     setTimeout(() => {
    //         setCurrentIndex((prevIndex) => 
    //             (prevIndex - scrollAmount + DESTINATION_DATA.length) % DESTINATION_DATA.length
    //         );
    //         setSlideDirection(null); // Reset slide direction after transition
    //     }, 500); // Match the CSS transition time (0.5s)
    // };

    // const getVisibleBoxes = () => {
    //     if (currentIndex + visibleBoxes <= DESTINATION_DATA.length) {
    //         return DESTINATION_DATA.slice(currentIndex, currentIndex + visibleBoxes);
    //     } else {
    //         const endPart = DESTINATION_DATA.slice(currentIndex);
    //         const startPart = DESTINATION_DATA.slice(0, (currentIndex + visibleBoxes) % DESTINATION_DATA.length);
    //         return [...endPart, ...startPart];
    //     }
    // };,

    const sliderRef = useRef(null);

    // Handle scroll jump logic for infinite scrolling
    const handleScroll = () => {
        const slider = sliderRef.current;
        const maxScrollLeft = slider.scrollWidth / 2;

        // If scrolled past the first half, jump back to the start
        if (slider.scrollLeft >= maxScrollLeft) {
            slider.scrollLeft = 0;
        }
        // If scrolled past the beginning (backwards), jump to the end
        if (slider.scrollLeft === 0) {
            slider.scrollLeft = maxScrollLeft;
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        slider.scrollLeft = slider.scrollWidth / 4; // Start in the middle
        slider.addEventListener('scroll', handleScroll);
        
        return () => {
            slider.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="container">
                {/* <div className={`des-box-wrapper ${slideDirection ? 'sliding' : ''}`}>
                    {getVisibleBoxes().map((dest, index) => (
                        <div 
                            key={dest.city} 
                            className={`des-box ${slideDirection === 'left' ? 'slide-left' : slideDirection === 'right' ? 'slide-right' : ''}`}
                        >
                            <DestinationBox {...dest} onClick={() => handleDestinationClick(dest)} />
                        </div>
                    ))}
                </div>
                <div className='arrow-buttons'>
                    <BackwardButton onClick={handlePrev} />
                    <ForwardButton onClick={handleNext} />
                </div> */}
                <div className="slider-container">
                    <div className="des-box-wrapper" ref={sliderRef}>
                        {/* Duplicate the boxes for seamless infinite scroll */}
                        {DESTINATION_DATA.concat(DESTINATION_DATA).map((dest, index) => (
                            <div key={`${dest.city}-${index}`} className="des-box">
                                <DestinationBox {...dest} onClick={() => handleDestinationClick(dest)}/>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedDestination && (
                    <div className="blog-content">
                        <h2 className="city-header">{selectedDestination.city}</h2>
                        <p>{selectedDestination.blog}</p>
                    </div>
                )}
                {selectedDestination && (
                    <Maps className="map" destination={selectedDestination} />
                )}
            </div>
        </>
    );
};

export default DesBoxWrapper;
