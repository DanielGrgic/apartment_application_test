import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import style from '../assets/css/apartment.module.css';

const Apartment = () => {
    const location = useLocation();
    const item = location.state?.item;
    const [showDetails, setShowDetails] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [totalCosts, setTotalCost] = useState<number | null>(null);

    useEffect(() => {
        const prices = item.pricelistInEuros.map(price => price.pricePerNight);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
    }, [item.pricelistInEuros]);


    const calculatePrice = () => {
        if (!startDate || !endDate) return null;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) return null;

        let totalPrice = 0;
        let currentDate = new Date(start);

        while (currentDate < end) {
            const applicablePrice = item.pricelistInEuros.find(price => {
                const intervalStart = new Date(price.intervalStart);
                const intervalEnd = new Date(price.intervalEnd);
                return currentDate >= intervalStart && currentDate < intervalEnd;
            });

            if (applicablePrice) {
                totalPrice += applicablePrice.pricePerNight;
            } else {
                // Ako ne postoji cijena za odabrani datum, možete dodati logiku po vašem izboru
                console.log("No price available for ", currentDate.toISOString().split('T')[0]);
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return totalPrice;
    };

    // const calculatePrice = () => {
    //     if (!startDate || !endDate) return null;
    //     // Your logic to calculate total price goes here
    // };

    const totalCost = calculatePrice();

    const isApartmentAvailable = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Provjera da li su odabrani datumi validni
        if (!start || !end || start >= end) return false;
    
        // Provjera da li je apartman dostupan u odabranom periodu
        return item.availableDates.some(dateRange => {
            const rangeStart = new Date(dateRange.intervalStart);
            const rangeEnd = new Date(dateRange.intervalEnd);
            return start >= rangeStart && end <= rangeEnd;
        });
    };

    const handleCheckAvailability = () => {
        if (isApartmentAvailable(startDate, endDate)) {
            const price = calculatePrice();
            setTotalCost(price); // Postavljanje ukupne cijene
        } else {
            alert("Apartman nije dostupan u odabranom vremenskom periodu. Molimo odaberite drugi datum.");
            setTotalCost(null); // Resetiranje cijene u slučaju nedostupnosti
        }
    };
    
    

    return (
        <div className={style.apartmentContainer}>
            <img src={item.image} alt={item.title} className="apartment-image" />
            <h1>{item.title}</h1>
            <p>Capacity: {item.capacity}</p>
            <p>Distance from Beach: {item.beachDistanceInMeters} meters</p>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails && (
                <div className={style.additionalDetails}>
                    <div className={style.amenities}>
                        <h3>Amenities:</h3>
                        <ul>
                            {Object.entries(item.amenities).map(([key, value]) => (
                                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Yes' : 'No'}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={style.dateSelection}>
                        <input min="2024-01-01"  max="2024-12-31" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input min="2024-01-01"  max="2024-12-31"  type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <button onClick={handleCheckAvailability}>Check Availability</button>
                        {totalCosts ? <p>Total Cost: €{totalCosts}</p> : 
                        <p>Price Range: €{minPrice} - €{maxPrice}. Select dates to see the exact price and book.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Apartment;
