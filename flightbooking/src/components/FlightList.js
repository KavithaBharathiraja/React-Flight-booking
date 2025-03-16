import React, { useState, useEffect } from 'react';
import { getFlights } from '../services/bookingService';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flights = await getFlights();
        setFlights(flights);
      } catch (error) {
        setError('Failed to load flights.');
      }
    };
    fetchFlights();
  }, []);

  return (
    <div className="box">
      <h2>Available Flights</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <strong>Flight ID: {flight.id}</strong> - {flight.name} ({flight.availableSeats} seats available)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
