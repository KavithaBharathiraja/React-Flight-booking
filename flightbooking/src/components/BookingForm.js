import React, { useState, useEffect } from 'react';
import { getFlights, createBooking } from '../services/bookingService';

const BookingForm = () => {
  const [flights, setFlights] = useState([]);
  const [userId, setUserId] = useState('');
  const [flightId, setFlightId] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true);
        const flights = await getFlights();
        setFlights(flights);
      } catch (error) {
        setError('Failed to load flights.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !flightId) {
      setError('Please provide a User ID and select a flight.');
      return;
    }

    try {
      setIsLoading(true);
      const booking = {
        user: { id: userId },
        flight: { id: flightId },
      };
      await createBooking(booking);
      setSuccessMessage('Booking created successfully!');
      setError(null);  // Reset any previous errors
    } catch (error) {
      setError('Failed to create booking.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box">
      <h2>Book Now</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available Flights:</label>
          <select
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            required
          >
            <option value="">Select a flight</option>
            {flights.length === 0 ? (
              <option value="">No flights available</option>
            ) : (
              flights.map((flight) => (
                <option key={flight.id} value={flight.id}>
                  {flight.name} (ID: {flight.id}, {flight.availableSeats} seats available)
                </option>
              ))
            )}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
