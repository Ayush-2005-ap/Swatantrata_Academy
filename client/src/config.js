// Automatically toggle between local dev and live Render backend!
export const BASE_URL = import.meta.env.PROD 
  ? "https://swatantrata-academy.onrender.com" 
  : "http://localhost:5050";

export const API_BASE_URL = `${BASE_URL}/api`;
