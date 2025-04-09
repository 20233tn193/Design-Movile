import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RegistroModal from './RegistroModal';
import API from '../api/api'; // Asegúrate de que la ruta es correcta
import { obtenerDuenoPorUsuarioId } from '../api/api';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingresa correo y contraseña');
      return;
    }
  
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, rol, usuarioId } = response.data;
  
      console.log('✅ Token recibido:', token);
      console.log('🎭 Rol:', rol);
      console.log('🧾 usuarioId:', usuarioId);
  
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('rol', rol);
  
      if (rol === 'DUENO' && usuarioId) {
        try {
          const response = await API.get(`/duenos/usuario/${usuarioId}`);
          const duenoId = response.data.id;
      
          console.log('🔑 duenoId real:', duenoId);
          await AsyncStorage.setItem('duenoId', duenoId);
          await AsyncStorage.setItem('correo', email); // guarda el correo ingresado manualmente
        } catch (err) {
          console.warn('⚠️ No se pudo obtener el duenoId');
        }
      }
  
      navigation.replace('BottomTabs');
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      Alert.alert('Error', 'Credenciales inválidas o problema de conexión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.titulo}>Sistema de Torneos</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#555"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnTexto}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegistroModal')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative' },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: { position: 'absolute', width: width * 2, height: 50, zIndex: 0 },
  franjaNegraTop: { top: 60, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }] },
  franjaGrisTop: { top: 90, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }] },
  franjaGrisBottom: { bottom: 40, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '10deg' }] },
  franjaNegraBottom: { bottom: 5, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '10deg' }] },
  franjaRojaBottom: { bottom: -30, left: -width, backgroundColor: '#d80027', transform: [{ rotate: '10deg' }] },
  logoContainer: { alignItems: 'center', marginTop: 120 },
  logo: { width: 80, height: 80, borderRadius: 40 },
  titulo: { marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#0e1b39' },
  form: { marginTop: 50, paddingHorizontal: 30 },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: '#000',
  },
  btnLogin: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTexto: { color: '#fff', fontWeight: 'bold' },
  link: {
    color: '#0e1b39',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
