// Automatically toggle between local dev and live Render backend!
export const API_BASE_URL = import.meta.env.PROD 
  ? "https://swatantrata-academy.onrender.com/api" 
  : "http://localhost:5050/api";
