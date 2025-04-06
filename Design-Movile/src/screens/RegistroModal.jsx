import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Dimensions, ScrollView
} from 'react-native';

const { width } = Dimensions.get('window');

export default function RegistroModal({ cerrarModal }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const handleCrearCuenta = () => {
    if (!nombre || !apellido || !correo || !password || !confirmarPassword) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí iría la lógica real de registro
    alert('Cuenta creada exitosamente');
    cerrarModal();
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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>Ingrese sus datos</Text>

        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.boton} onPress={handleCrearCuenta}>
          <Text style={styles.botonTexto}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cerrarModal}>
          <Text style={styles.link}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  titulo: {
    backgroundColor: '#0e1b39',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 25,
    borderRadius: 6,
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 14,
  },
  boton: {
    backgroundColor: '#c8102e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0e1b39',
    textDecorationLine: 'underline',
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: -1,
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
