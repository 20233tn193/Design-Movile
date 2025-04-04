import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function RegistroEquipoScreen({ navigation }) {
  const [imagenEquipo, setImagenEquipo] = useState(null);
  const [nombreEquipo, setNombreEquipo] = useState('');

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>Registro de Equipo</Text>
      </View>

      {/* Franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegra]} />
      <View style={[styles.franja, styles.franjaGris]} />

      {/* Título */}
      <Text style={styles.titulo}>Datos del Equipo</Text>

      {/* Imagen placeholder */}
      <View style={styles.imagenContainer}>
        {imagenEquipo ? (
          <Image source={{ uri: imagenEquipo }} style={styles.imagen} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Botón cargar imagen */}
      <TouchableOpacity style={styles.btnCargarImagen}>
        <Text style={styles.btnCargarTexto}>Cargar imagen</Text>
      </TouchableOpacity>

      {/* Input nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Equipo"
        placeholderTextColor="#555"
        value={nombreEquipo}
        onChangeText={setNombreEquipo}
      />

      {/* Botón Crear */}
      <TouchableOpacity style={styles.btnCrear}>
        <Text style={styles.btnTextoBlanco}>Crear</Text>
      </TouchableOpacity>

      {/* Botón Cancelar */}
      <TouchableOpacity
        style={styles.btnCancelar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnTextoBlanco}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 110,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
  },
  triangleTopRed: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 80,
    borderRightWidth: width,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 0,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 40,
    left: -width,
    zIndex: 0,
  },
  franjaNegra: {
    top: 115,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGris: {
    top: 140,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0e1b39',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  imagenContainer: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
  },
  imagen: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  btnCargarImagen: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnCargarTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    color: '#000',
  },
  btnCrear: {
    backgroundColor: '#d80027',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnCancelar: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    alignItems: 'center',
  },
  btnTextoBlanco: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
