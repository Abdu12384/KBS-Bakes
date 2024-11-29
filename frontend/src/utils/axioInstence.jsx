import axios from 'axios';

// Create an Axios instance
const axioInstence = axios.create({
  baseURL: 'http://localhost:3000', // Base URL of your backend API
  withCredentials: true,           // Send cookies with every request
});

// Add a response interceptor to handle token refresh
axioInstence.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries

      try {
        // Make a request to the refresh token endpoint
        const refreshResponse = await axios.post(
          'http://localhost:3000/auth/refresh',
          {}, // Pass any necessary payload
          { withCredentials: true }
        );

        // Get the new access token
        const newAccessToken = refreshResponse.data.accessToken;

        // Update headers with the new access token
        axioInstence.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axioInstence(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // If not 401 or another issue, reject the error
  }
);

export default axioInstence;
