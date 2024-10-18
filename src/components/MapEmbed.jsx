import React from 'react';

const MapEmbed = ({ places }) => {
    const mapBaseURL = "https://www.google.com/maps/embed/v1/place";
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // You need to replace this with your actual API key.

    return (
        <div>
            {places.map((place, index) => (
                <iframe
                    key={index}
                    width="1200"
                    height="450"
                    frameborder="0"
                    style={{ border: 0 }}
                    src={`${mapBaseURL}?key=${apiKey}&q=${encodeURIComponent(place.name)}`}
                    allowFullScreen
                ></iframe>
            ))}
        </div>
    );
};

export default MapEmbed;
