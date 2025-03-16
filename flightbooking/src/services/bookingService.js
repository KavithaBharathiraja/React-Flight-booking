import axios from 'axios';

const API_URL = 'http://localhost:8080/datastore';  // Adjust to your backend URL

// Fetch all available flights
export const getFlights = async () => {
    try {
        const response = await axios.get('http://localhost:8082/flights');
        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Create a new booking
export const createBooking = async (booking) => {
    try {
        const response = await axios.post('http://localhost:8083/bookings', booking);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all bookings
export const getBookings = async () => {
    try {
        const response = await axios.get('http://localhost:8083/bookings');
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
        throw error;
    }
};
