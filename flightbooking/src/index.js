import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: if you have a CSS file for global styles
import App from './App';  // Import the main App component
 // Optional: for performance tracking
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Web vitals for performance tracking
reportWebVitals();
