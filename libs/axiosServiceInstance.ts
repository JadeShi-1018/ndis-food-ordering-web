import axios from 'axios';
import { toast } from 'react-toastify';

const axiosServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosServiceInstance.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (!body.succeed) {
      const msg = body.errorMessage || body.message || 'Unknown error';
      const code = body.errorCode || response.status.toString();
      toast.error(`Error ${code}: ${msg}`);
      return Promise.reject(new Error(`Error ${code}: ${msg}`));
    }
    return body;
  },
  (error) => {
    const msg = error?.response?.data?.errorMessage || error.message || 'Network error';
    toast.error(`Request failed: ${msg}`);
    return Promise.reject(error);
  }
);

export default axiosServiceInstance;
