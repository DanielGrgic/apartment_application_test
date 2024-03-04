import React, { useState, useEffect } from 'react';
import OneAparHome from '../components/oneAparHome.tsx'; // Import OneAparHome component
import style from '../assets/css/home.module.css';
import { useNavigate, Link, Route } from 'react-router-dom';
import OneApartment from './OneApartment.tsx';

interface Amenities {
    airConditioning: boolean;
    parkingSpace: boolean;
    pets: boolean;
    pool: boolean;
    wifi: boolean;
    tv: boolean;
}
  
interface PriceList {
    intervalStart: string;
    intervalEnd: string;
    pricePerNight: number;
}

interface AvailableDate {
    intervalStart: string;
    intervalEnd: string;
}

interface Accommodation {
    id: number;
    title: string;
    image: string;
    capacity: number;
    beachDistanceInMeters: number;
    amenities: Amenities;
    pricelistInEuros: PriceList[];
    availableDates: AvailableDate[];
}
  

const Home = () => {
    const [data, setData] = useState<Accommodation[]>([]);
    const [capacityFilter, setCapacityFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hasAirConditioning, setHasAirConditioning] = useState(false);
    const [hasParkingSpace, setHasParkingSpace] = useState(false);
    const [hasPets, setHasPets] = useState(false);
    const [hasPool, setHasPool] = useState(false);
    const [hasWifi, setHasWifi] = useState(false);
    const [hasTv, setHasTv] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://api.adriatic.hr/test/accommodation')
        .then(response => response.json())
        .then(data => {
            console.log(data, "fetched data");
            setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);


    const doRangesOverlap = (start1, end1, start2, end2) => {
        return start1 <= end2 && start2 <= end1;
    };
      
    const filteredData = data.filter(item => {
        const matchesCapacity = capacityFilter === '' || item.capacity === Number(capacityFilter);
        const matchesAirConditioning = !hasAirConditioning || item.amenities.airConditioning;
        const matchesParkingSpace = !hasParkingSpace || item.amenities.parkingSpace;
        const matchesPets = !hasPets || item.amenities.pets;
        const matchesPool = !hasPool || item.amenities.pool;
        const matchesWifi = !hasWifi || item.amenities.parkingSpace;
        const matchesTv = !hasTv || item.amenities.parkingSpace;
        const matchesDate = startDate === '' || endDate === '' || item.availableDates.some(dateRange => {
          const rangeStart = new Date(dateRange.intervalStart);
          const rangeEnd = new Date(dateRange.intervalEnd);
          const filterStart = new Date(startDate);
          const filterEnd = new Date(endDate);
          return doRangesOverlap(filterStart, filterEnd, rangeStart, rangeEnd);
        });
      
        return  matchesCapacity && 
                matchesDate && 
                matchesAirConditioning && 
                matchesParkingSpace && 
                matchesPets && 
                matchesPool &&
                matchesWifi &&
                matchesTv;
    });


    const handleMoreDetails = (item) => {
        // const selectedApartment = data.find(apartment => apartment.id === id);
        navigate(`/apartment/${item.id}`, { state: { item } });
    };

    return (
        <main className={style.mainContainer}>
            <div className={style.filterSection}>
                <div className={style.filterGroup}>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        placeholder="Filter by capacity"
                        value={capacityFilter}
                        onChange={(e) => setCapacityFilter(e.target.value)}
                    />
                </div>
                <div className={`${style.filterGroup} ${style.dateFilters}`}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                        min="2024-01-01"
                        max="2024-12-31"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                        min="2024-01-01"
                        max="2024-12-31"
                    />
                </div>
                <div className="filterGroup">
                    <label>Air Conditioning:</label>
                    <input
                        type="checkbox"
                        checked={hasAirConditioning}
                        onChange={(e) => setHasAirConditioning(e.target.checked)}
                    />
                </div>
                <div className="filterGroup">
                    <label>Parking Space:</label>
                    <input
                        type="checkbox"
                        checked={hasParkingSpace}
                        onChange={(e) => setHasParkingSpace(e.target.checked)}
                    />
                </div>
                <div className="filterGroup">
                    <label>Pets:</label>
                    <input
                        type="checkbox"
                        checked={hasPets}
                        onChange={(e) => setHasPets(e.target.checked)}
                    />
                </div>
                <div className="filterGroup">
                    <label>Pool:</label>
                    <input
                        type="checkbox"
                        checked={hasPool}
                        onChange={(e) => setHasPool(e.target.checked)}
                    />
                </div>
                <div className="filterGroup">
                    <label>WiFi:</label>
                    <input
                        type="checkbox"
                        checked={hasWifi}
                        onChange={(e) => setHasWifi(e.target.checked)}
                    />
                </div>
                <div className="filterGroup">
                    <label>TV:</label>
                    <input
                        type="checkbox"
                        checked={hasTv}
                        onChange={(e) => setHasTv(e.target.checked)}
                    />
                </div>
            </div>
            
            <div className={style.container}>
                {filteredData.map((item, index) => (
                    <div className={style.card}  key={item.id}>
                        <img src={item.image} alt={item.title}/>
                        <h2 className={style.title}>#{index + 1}: {item.title}</h2>
                        <p>Distance From Beach in Meters: {item.beachDistanceInMeters}</p>
                        <div className={style.amenities}>
                        </div>
                        <button onClick={() => handleMoreDetails(item)}>Click me</button>
                        <h2>Capacity: {item.capacity}</h2>
                    </div>
                ))}
            </div>
        </main>
        
    );
};

export default Home;
