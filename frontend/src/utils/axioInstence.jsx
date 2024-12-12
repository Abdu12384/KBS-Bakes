import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL



const axioInstence = axios.create({
  baseURL:BACKEND_URL,
  withCredentials: true, 
})


axioInstence.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    console.log('error form refrehsrequst',error);
    

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {

        const refreshResponse = await axios.post(
          'http://localhost:3000/auth/refresh-token',
          {}, // Pass any necessary payload
          { withCredentials: true }
        );


        const newAccessToken = refreshResponse.data.accessToken;
        console.log('newAccesstoken',newAccessToken);
        


        axioInstence.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;


        return axioInstence(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export default axioInstence;
