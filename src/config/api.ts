// src/config/api.ts
// Centralized API base URL. Set VITE_API_URL in a .env file to point
// the frontend at a deployed backend; defaults to local dev server.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";