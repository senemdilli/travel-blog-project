import React, { useState } from 'react';
import DestinationBox from './DestinationBox';
import '../css/DesBoxWrapper.css';

const DesBoxWrapper = ({ destination }) => {
    // State to manage selected destination
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isGridView, setIsGridView] = useState(false);

    const destinationsData = [
        { country: 'France', city: 'Paris', img: './images/paris.jpg', blog: 'Paris is the capital of France.' },  
        { country: 'Italy', city: 'Rome', img: './images/rome.jpg', blog: 'Rome is the capital of Italy.' },
        { country: 'Spain', city: 'Barcelona', img: './images/barcelona.jpg', blog: 'Barcelona is the capital of Spain.' },
        { country: 'Germany', city: 'Berlin', img: './images/berlin.jpg', blog: 'Berlin is the capital of Germany.' },
        { country: 'England', city: 'London', img: './images/london.jpg', blog: 'London is the capital of England.' },
        { country: 'USA', city: 'New York', img: './images/new-york.jpg', blog: 'New York is not the capital of the USA.' }, // Fixed the incorrect information
        { country: 'Japan', city: 'Tokyo', img: './images/tokyo.jpg', blog: 'Tokyo is the capital of Japan.' },
        { country: 'China', city: 'Beijing', img: './images/beijing.jpg', blog: 'Beijing is the capital of China.' },
    ];

    // Function to handle clicking on a destination box
    const handleDestinationClick = (destination) => {
        if (selectedDestination && selectedDestination.city === destination.city) {
            // If the user clicks on the currently open destination, close the blog content
            setSelectedDestination(null);
            setIsGridView(false);
        } else {
            // Otherwise, open the clicked destination's blog content
            setSelectedDestination(destination);
            setIsGridView(true);
        }
    };
    

    return (
        <div className={`container ${isGridView ? 'grid-view' : ''}`}>
            <div className="des-box-wrapper">
                {destinationsData.map((dest) => (
                    <DestinationBox 
                        key={dest.city} 
                        {...dest} 
                        onClick={() => handleDestinationClick(dest)} // Set the clicked destination
                    />
                ))}
            </div>
            {selectedDestination && (
                <div className='blog-content'>
                    <h2>{selectedDestination.city}</h2>
                    <p>{selectedDestination.blog}</p>
                </div>
            )}
        </div>
    );
};

export default DesBoxWrapper;
