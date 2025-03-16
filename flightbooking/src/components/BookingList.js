import React, { useState, useEffect } from 'react';
import { getBookings } from '../services/bookingService';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fetchedBookings = await getBookings(); 
        setBookings(fetchedBookings);
      } catch (error) {
        setError('Failed to load bookings.');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="box">
      <h2>Bookings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id}>
              {booking.user.name} booked {booking.flight.name} on {booking.createdAt}
            </li>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </ul>
    </div>
  );
};

export default BookingList;
