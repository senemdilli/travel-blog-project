import React from 'react';
import { useEffect } from 'react';
import { MAPS_DATA } from '../utils/data.js';

const Maps = ({ destination }) => {

    useEffect(() => {
        console.log('Destination:', destination);
        console.log('Destination:', MAPS_DATA?.[destination?.country]?.mapsrc);
    }, [destination]);

    return (
        <div>
          <iframe
            src={MAPS_DATA?.[destination?.city]?.mapsrc}
            className='map'
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      );
};  

export default Maps;