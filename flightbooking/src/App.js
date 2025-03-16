import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import FlightList from './components/FlightList';
import axios from 'axios';
import './index.css';
import { motion } from 'framer-motion';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');

  // Fetch a random image from Unsplash API
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            query: 'flight',
            client_id: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your Unsplash Access Key
          }
        });
        setImageUrl(response.data[0]?.urls?.regular || 'https://via.placeholder.com/300'); // Fallback if no image found
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl('https://via.placeholder.com/300'); // Fallback if API fails
      }
    };

    fetchImage();
  }, []);

  return (
    <Router>
      <div>
        <h1>Taf Flight Booking</h1>
        <motion.nav 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bookings">View Bookings</Link></li>
            <li><Link to="/flights">View Flights</Link></li>
            <li><Link to="/create-booking">Start Booking</Link></li>
          </ul>
        </motion.nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={
              <motion.div 
                className="box"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}>
                  <h2>Welcome to the Taf Booking Service</h2>
                       <p>Take Off to New Adventures!</p>
                          <p>Hassle-Free Flight Booking Awaits!</p>

              </motion.div>
            } />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/flights" element={<FlightList />} />
            <Route path="/create-booking" element={<BookingForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
