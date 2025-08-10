// src/api.js
import axios from 'axios';

const API = axios.create({
baseURL: 'https://backendshield.onrender.com'
});
export const getProducts = () => API.get('/products');
export default API;
