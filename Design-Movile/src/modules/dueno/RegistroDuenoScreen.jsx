import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function RegistroDuenoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false); // loader

  const handleCrearCuenta = async () => {
    if (!nombre || !apellido || !email || !contrasena || !confirmar) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos');
      return;
    }
  
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(email)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo válido');
      return;
    }
  
    if (contrasena !== confirmar) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
  
    setLoading(true);
    try {
      // 👉 Primero registramos al dueño
      await API.post('/auth/register/dueno', {
        email,
        password: contrasena,
        roles: ['DUENO'],
        nombre,
        apellido,
      });
  
      // 👉 Luego iniciamos sesión con el mismo correo y contraseña
      const loginResponse = await API.post('/auth/login', {
        email,
        password: contrasena,
      });
  
      const { token, usuarioId } = loginResponse.data;
  
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuarioId', usuarioId);
      await AsyncStorage.setItem('correo', email);
  
      // 🔎 Obtener el duenoId desde el backend con el usuarioId
      const duenoResponse = await API.get(`/duenos/usuario/${usuarioId}`);
      const duenoId = duenoResponse.data.id;
      await AsyncStorage.setItem('duenoId', duenoId);
  
      Alert.alert('Cuenta creada', 'Tu cuenta fue creada correctamente');
      navigation.replace('Main'); // Cambia a la pantalla principal de la app
  
    } catch (error) {
      const mensaje = error.response?.data || error.message;
    
      console.log('❌ Error al registrar o loguear:', mensaje);
    
      if (mensaje && typeof mensaje === 'string' && mensaje.toLowerCase().includes('email')) {
        Alert.alert(
          '¡Ups!',
          'Este correo ya está registrado. Intenta iniciar sesión o usa otro correo.'
        );
      } else {
        Alert.alert(
          'Algo salió mal',
          'No pudimos completar tu registro en este momento. Intenta más tarde.'
        );
      }
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

      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}> Registro</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingrese sus datos</Text>

        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={contrasena} onChangeText={setContrasena} />
        <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry value={confirmar} onChangeText={setConfirmar} />

        {loading ? (
          <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 10 }} />
        ) : (
          <TouchableOpacity style={styles.btnCrear} onPress={handleCrearCuenta}>
            <Text style={styles.btnTexto}>Crear Cuenta</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Ya tengo cuenta</Text>
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
    zIndex: 0,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaNegraTop: {
    top: 70,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 100,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 50,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 20,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 10,
    paddingLeft: 15,
    width: '100%',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
  },
  content: {
    zIndex: 10,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: '#000',
  },
  btnCrear: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#0e1b39',
    textAlign: 'center',
    marginTop: 0,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});