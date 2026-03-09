/**
 * @file api.js
 * @description Centralized Axios instance for communicating with the Django REST API (v1).
 * Handles automatic JWT token injection and global session management (logout on 401).
 */

import axios from "axios";

// Create an instance configured for the v1 API namespace
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

/**
 * 1. Request Interceptor:
 * Automatically runs before every outgoing HTTP request.
 * Fetches the JWT 'token' from localStorage and attaches it to the 'Authorization' header.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Use Bearer token standard for JWT authentication
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 2. Response Interceptor:
 * Automatically runs when a response is received from the server.
 * Handles global error scenarios, specifically 401 Unauthorized (Expired Session).
 */
api.interceptors.response.use(
  (response) => {
    // Pass successful responses through untouched
    return response;
  },
  (error) => {
    // If the server returns 401, the user's token is likely invalid or expired
    if (error.response && error.response.status === 401) {
      // Clear all local auth data to prevent stale state issues
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      
      // Force redirect to login page if they aren't already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
    }
    // Forward the error so the calling component can handle specific UI feedback
    return Promise.reject(error);
  }
);

export default api;
