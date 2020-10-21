import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.108:3333'
    // baseURL: 'https://happy-app-backend.herokuapp.com'
})

export default api;