import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginDuenoScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    navigation.navigate('CuentaDueno');
  };

  const handleRegistro = () => {
    navigation.navigate('RegistroDueno');
  };

  return (
    <View style={styles.container}>
      {/* Franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegra]} />
      <View style={[styles.franja, styles.franjaGris]} />

      {/* Contenido centrado */}
      <View style={styles.content}>
        <Image source={require('../../../assets/logo.jpg')} style={styles.logo} />

        <Text style={styles.titulo}>Inicio de Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <TouchableOpacity style={styles.botonRojo} onPress={handleLogin}>
          <Text style={styles.textoBoton}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonAzul} onPress={handleRegistro}>
          <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      {/* Franjas inferiores */}
      <View style={styles.franjaInferiorRoja} />
      <View style={styles.franjaInferiorNegra} />
      <View style={styles.franjaInferiorGris} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0e1b39',
  },
  input: {
    backgroundColor: '#e6e6e6',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  botonRojo: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  botonAzul: {
    backgroundColor: '#0e1b39',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width * 2,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaNegra: {
    top: 80,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGris: {
    top: 110,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaInferiorRoja: {
    position: 'absolute',
    bottom: 0,
    left: -width,
    width: width * 2,
    height: 60,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaInferiorNegra: {
    position: 'absolute',
    bottom: 20,
    left: -width,
    width: width * 2,
    height: 60,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaInferiorGris: {
    position: 'absolute',
    bottom: 40,
    left: -width,
    width: width * 2,
    height: 60,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
});