import React, { useState } from 'react';
import '../css/DestinationList.css';
import { DESTINATION_DATA } from '../utils/data.js';
import Maps from './Maps';

const DestinationList = () => {
    const [selectedDestination, setSelectedDestination] = useState(DESTINATION_DATA[0]);

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
    };

    return (
        <div className='container'>
            <div className="destination-list">
                {DESTINATION_DATA.map((dest, index) => (
                    <div 
                        key={index}
                        className={`destination-point ${selectedDestination && selectedDestination.city === dest.city ? 'selected' : ''}`}
                        onClick={() => handleDestinationClick(dest)}
                    >
                        <h3 className='des-city'>{dest.city}</h3>
                    </div>
                ))}
            </div>
            <div className='destination-info'>
                {selectedDestination && (
                    <>
                        <h2 className="city-header">{selectedDestination.city}</h2>
                        <Maps destination={selectedDestination} />
                        <div className="blog-content">
                            <p>{selectedDestination.blog}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DestinationList;
