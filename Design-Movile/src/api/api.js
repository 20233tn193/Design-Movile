// src/api/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://192.168.108.139:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega automáticamente el token a cada petición
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

// 🔽 Nueva función para obtener dueño por ID
export const obtenerDuenoPorId = async (id) => {
  try {
    const response = await API.get(`/duenos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el dueño:', error);
    throw error;
  }
};

// src/api/api.js
export const obtenerEquipoPorDueno = async (duenoId) => {
  try {
    const response = await API.get(`/equipos/dueño/${duenoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener equipo del dueño:', error);
    return []; // en caso de error, regresa lista vacía
  }
};


export default API;
