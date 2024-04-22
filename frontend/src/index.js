// Client-side index.js to render the App component

// Import necessary modules
import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Render the App component
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Report web vitals
reportWebVitals();
