// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ganti sesuai backend kamu
});

export default api;
