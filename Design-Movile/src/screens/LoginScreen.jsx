import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RegistroModal from './RegistroModal';
import API from '../api/api';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log('📤 Enviando datos:', { correo, password });

      const res = await API.post('/auth/login', {
        email: correo,
        password: password,
      });

      const token = res.data.token;
      const rol = res.data.rol;
      const usuarioId = res.data.usuarioId;

      console.log('✅ Token recibido:', token);
      console.log('🎭 Rol:', rol);
      console.log('🆔 Usuario ID:', usuarioId);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('rol', rol);

      if (rol === 'ARBITRO') {
        navigation.replace('ArbitroHome');
      } else if (rol === 'DUENO') {
        // 🔁 Obtener duenoId usando el usuarioId
        const duenoRes = await API.get(`/duenos/usuario/${usuarioId}`);
        const dueno = duenoRes.data;

        console.log('🧑‍💼 Dueño:', dueno);

        await AsyncStorage.setItem('duenoId', dueno.id);
        navigation.replace('CuentaDueno');
      } else {
        Alert.alert('Error', 'Rol no reconocido');
      }
    } catch (error) {
      console.log('❌ Error de login:', error.response?.data || error.message);
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.content}>
        <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.titulo}>Inicio de Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          placeholderTextColor="#555"
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#555"
        />

        <TouchableOpacity style={styles.botonIngresar} onPress={handleLogin}>
          <Text style={styles.botonTexto}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonRegistrar}
          onPress={() => setMostrarModal(true)}
        >
          <Text style={styles.botonTextoSecundario}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={mostrarModal} animationType="slide">
        <RegistroModal cerrarModal={() => setMostrarModal(false)} />
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#0e1b39',
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 14,
  },
  botonIngresar: {
    backgroundColor: '#c8102e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  botonRegistrar: {
    backgroundColor: '#0e1b39',
    padding: 15,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonTextoSecundario: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 1,
  },
  franjaGrisTop: {
    top: 120,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaRojaTop: {
    top: 60,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 70,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 35,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: 0,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
});