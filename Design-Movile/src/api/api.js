// src/api/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://192.168.100.181:8080/api',
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

export const obtenerDuenoPorUsuarioId = async (usuarioId) => {
  try {
    const response = await API.get(`/duenos/usuario/${usuarioId}`);
    return response.data; // debe incluir _id
  } catch (error) {
    console.error('❌ Error al obtener dueño por usuarioId:', error);
    throw error;
  }
};

export const obtenerDuenoPorId = async (duenoId) => {
  try {
    const response = await API.get(`/duenos/${duenoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el dueño por id:', error);
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
