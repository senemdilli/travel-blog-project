import DestinationBox from './DestinationBox';

const DesBoxWrapper = ({ destination }) => {

    const destinationsData = [
        { country: 'France', city: 'Paris', img: './images/paris.jpg' },  
        { country: 'Italy', city: 'Rome', img: './images/rome.jpg' },
        { country: 'Spain', city: 'Barcelona', img: './images/barcelona.jpg' },
        { country: 'Germany', city: 'Berlin', img: './images/berlin.jpg' },
        { country: 'England', city: 'London', img: './images/london.jpg' },
        { country: 'USA', city: 'New York', img: './images/new-york.jpg' },
        { country: 'Japan', city: 'Tokyo', img: './images/tokyo.jpg' },
        { country: 'China', city: 'Beijing', img: './images/beijing.jpg' }
    ];

    return (
        <div className="des-box-wrapper">
            {destinationsData.map((destination) => (
                <DestinationBox key={destination.city} {...destination} />
            ))}
        </div>
    );
};

export default DesBoxWrapper;
