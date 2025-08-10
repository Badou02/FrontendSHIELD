// src/api.js
import axios from 'axios';

const API = axios.create({
baseURL: 'https://backendshield.onrender.com/api'
});
export const getProducts = () => API.get('/products');
export default API;
