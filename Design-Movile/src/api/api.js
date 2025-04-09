// src/api/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://192.168.1.69:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor para incluir el token JWT en cada petición
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

// 🔽 Obtener dueño por ID
export const obtenerDuenoPorId = async (id) => {
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

// 🔽 Obtener equipo por dueño
export const obtenerEquipoPorDueno = async (duenoId) => {
  try {
    const response = await API.get(`/equipos/dueño/${duenoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener equipo del dueño:', error);
    return [];
  }
};

// 🔽 Obtener partidos asignados a un árbitro
export const obtenerPartidosPorArbitro = async (arbitroId) => {
  try {
    const response = await API.get(`/partidos/arbitro/${arbitroId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener partidos del árbitro:', error);
    return [];
  }
};

// 🔽 Obtener partido por ID
export const obtenerPartidoPorId = async (partidoId) => {
  try {
    const response = await API.get(`/partidos/${partidoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener partido por ID:', error);
    throw error;
  }
};

// 🔽 Obtener jugadores por equipo
export const obtenerJugadoresPorEquipo = async (equipoId) => {
  try {
    const response = await API.get(`/jugadores/equipo/${equipoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener jugadores del equipo:', error);
    return [];
  }
};

// 🔽 Registrar resultado de partido
export const registrarResultadoPartido = async (partidoId, registro) => {
  try {
    await API.put(`/partidos/registrar-resultado/${partidoId}`, { registro });
  } catch (error) {
    console.error('Error al registrar resultado del partido:', error);
    throw error;
  }
};

export default API;
