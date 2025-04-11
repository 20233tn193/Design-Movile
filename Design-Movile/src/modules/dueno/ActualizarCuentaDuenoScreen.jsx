import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import { obtenerDuenoPorId, actualizarUsuarioDesdeDueno } from '../../api/api';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function ActualizarCuentaDuenoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [duenoId, setDuenoId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const [idUsuario, setIdUsuario] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      const id = await AsyncStorage.getItem('duenoId');
      const email = await AsyncStorage.getItem('correo');
      const usuarioId = await AsyncStorage.getItem('usuarioId'); // 👈 importante
      setDuenoId(id);
      setIdUsuario(usuarioId); // 👈 guarda el usuarioId
      setCorreo(email || '');

      try {
        const dueno = await obtenerDuenoPorId(id);
        setNombre(dueno.nombre);
        setApellido(dueno.apellido);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información');
      }
    };

    cargarDatos();
  }, []);

  const handleActualizar = async () => {
    console.log('🟡 Intentando actualizar...');

    // Validaciones
    if (!nombre || !apellido) {
      Alert.alert('Campos vacíos', 'Nombre y Apellido son obligatorios');
      return;
    }

    if (!correo) {
      Alert.alert('Correo requerido', 'El correo no puede estar vacío');
      return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo válido');
      return;
    }

    try {
      console.log('🔵 Enviando PUT al dueño...');
      await API.put(`/duenos/${duenoId}`, { nombre, apellido, idUsuario });

      console.log('🔵 Enviando PUT al usuario...');
      const userUpdateBody = { email: correo };

      if (password && confirmarPassword) {
        if (password !== confirmarPassword) {
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }
        userUpdateBody.password = password;
      }

      await API.put(`/duenos/${duenoId}/usuario`, userUpdateBody);
      await AsyncStorage.setItem('correo', correo); // ✅ aquí

      Alert.alert('Éxito', 'Datos actualizados correctamente');
      navigation.goBack();
    } catch (error) {
      console.log('❌ Error actualizando cuenta:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo actualizar la cuenta');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Actualizar Cuenta</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingrese sus datos</Text>

        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          placeholder="Correo"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
        />

        <TouchableOpacity style={styles.botonPrimario} onPress={handleActualizar}>
          <Text style={styles.botonTexto}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botonTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 10,
  },
  headerText: { color: '#FDBA12', fontSize: 18, fontWeight: 'bold' },
  content: {
    zIndex: 10,
    width: '85%',
    alignSelf: 'center',
    marginTop: 60,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  botonPrimario: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#4d4d4d',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
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
    bottom: -10,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
});