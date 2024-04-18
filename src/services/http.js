import axios from "axios";

const axiosInstance = axios.create({
    baseURL:window.backURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;