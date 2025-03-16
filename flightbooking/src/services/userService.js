import axios from 'axios';

const API_URL = 'http://localhost:8080/users'; // Adjust based on your backend URL

// Register a new user
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error;
  }
};
