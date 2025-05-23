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
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import API from '../api/api';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ✅ ESTA LÍNEA FALTABA

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingresa correo y contraseña');
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(email)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo con formato válido');
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 3000); // 3 segundos
    
      const res = await API.post(
        '/auth/login',
        { email, password },
        { signal: controller.signal } // 🧠 se pasa el controller
      );
    
      clearTimeout(timeout); // si responde antes de los 3 segundos
    
      const { token, rol, usuarioId } = res.data;
    
      console.log('✅ Token recibido:', token);
      console.log('🎭 Rol:', rol);
      console.log('🆔 Usuario ID:', usuarioId);
    
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('rol', rol);
      await AsyncStorage.setItem('usuarioId', usuarioId);
      await AsyncStorage.setItem('correo', email);
    
      if (rol === 'ARBITRO') {
        const arbitroRes = await API.get(`/arbitros/usuario/${usuarioId}`);
        await AsyncStorage.setItem('arbitroId', arbitroRes.data.id);
        navigation.replace('ArbitroTabs'); // ✅ Redirigir al flujo de tabs del árbitro
      } else if (rol === 'DUENO') {
        const duenoRes = await API.get(`/duenos/usuario/${usuarioId}`);
        await AsyncStorage.setItem('duenoId', duenoRes.data.id);
        navigation.replace('Main');
      } else {
        Alert.alert('Error', 'Rol no reconocido');
      }
    
     // navigation.replace('Main'); // Cambia a la pantalla principal de la app
    
    } catch (error) {
      if (error.name === 'AbortError') {
        Alert.alert('Tiempo de espera', 'La solicitud está tardando demasiado. Intenta más tarde.');
      } else {
        console.log('❌ Error en login:', error.response?.data || error.message);
        Alert.alert('Error', 'Credenciales inválidas o problema de conexión');
      }
    } finally {
      setLoading(false);
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

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnTexto}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegistroDuenoScreen')}>
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
    top: -20,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
    transform: [{ rotate: '4deg' }]
  },
  franja: { position: 'absolute', width: width * 2, height: 50, zIndex: 0 },
  franjaNegraTop: { top: 50, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }] , zIndex: 3},
  franjaGrisTop: { top: 95, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }], zIndex: 2},
  franjaGrisBottom: { bottom: 80, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '10deg' }] },
  franjaNegraBottom: { bottom: 40, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '10deg' }] },
  franjaRojaBottom: { bottom: 0, left: -width, backgroundColor: '#d80027', transform: [{ rotate: '10deg' }] },
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
