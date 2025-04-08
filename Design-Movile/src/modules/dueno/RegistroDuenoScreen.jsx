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
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../api/api'; // ← Ruta corregida según estructura real

const { width } = Dimensions.get('window');

export default function RegistroDuenoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleCrearCuenta = async () => {
    if (!nombre || !apellido || !email || !contrasena || !confirmar) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos');
      return;
    }

    if (contrasena !== confirmar) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const usuarioResponse = await API.post('/auth/register', {
        email,
        password: contrasena,
        roles: ['DUENO'],
      });

      const idUsuario = usuarioResponse.data.id;
      const token = usuarioResponse.data.token;

      await AsyncStorage.setItem('token', token);

      await API.post('/dueno', {
        nombre,
        apellido,
        email,
        idUsuario,
      });

      Alert.alert('Éxito', 'Cuenta creada correctamente');
      navigation.navigate('CuentaDuenoScreen');
    } catch (error) {
      console.error('Error al registrar dueño:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo registrar el usuario');
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

        <TouchableOpacity style={styles.btnCrear} onPress={handleCrearCuenta}>
          <Text style={styles.btnTexto}>Crear Cuenta</Text>
        </TouchableOpacity>

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
    position: 'absolute', top: 0, left: 0,
    width: 0, height: 0, borderTopWidth: 100,
    borderRightWidth: width, borderTopColor: '#d80027', borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: { position: 'absolute', width: width * 2, height: 50, zIndex: 0 },
  franjaNegraTop: { top: 60, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }] },
  franjaGrisTop: { top: 90, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }] },
  franjaGrisBottom: { bottom: 40, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '10deg' }] },
  franjaNegraBottom: { bottom: 5, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '10deg' }] },
  franjaRojaBottom: { bottom: -30, left: -width, backgroundColor: '#d80027', transform: [{ rotate: '10deg' }] },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', padding: 12, paddingLeft: 15, width: '100%' },
  headerText: { color: '#FDBA12', fontWeight: 'bold', fontStyle: 'italic', fontSize: 16 },
  content: { zIndex: 10, paddingHorizontal: 30, paddingTop: 40 },
  titulo: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#0e1b39', color: '#fff', textAlign: 'center', padding: 10, borderRadius: 8, marginBottom: 20 },
  input: { backgroundColor: '#f1f1f1', borderRadius: 10, padding: 12, marginBottom: 12, color: '#000' },
  btnCrear: { backgroundColor: '#d80027', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnTexto: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#0e1b39', textAlign: 'center', marginTop: 15, fontWeight: 'bold', textDecorationLine: 'underline' },
});
