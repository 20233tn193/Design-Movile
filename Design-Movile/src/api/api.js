// src/api/API.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
    baseURL: 'http://192.168.0.143:8080/api', // ← TU IP AQUÍ
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token JWT automáticamente
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

