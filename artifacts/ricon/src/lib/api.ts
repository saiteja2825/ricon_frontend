/**
 * Centralized API configuration.
 * 
 * In local development, VITE_API_URL is typically unset, falling back to localhost.
 * In production (e.g., Vercel, Render), VITE_API_URL should be set to the backend's fully qualified domain.
 */
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
