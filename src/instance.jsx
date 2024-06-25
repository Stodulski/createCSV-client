import axios from 'axios';

const { VITE_API } = import.meta.env;
const instance = axios.create({
    baseURL: VITE_API,
    timeout: 10000,  
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;