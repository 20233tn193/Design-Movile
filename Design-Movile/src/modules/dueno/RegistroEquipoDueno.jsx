import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function RegistroEquipoDueno({ navigation }) {
  const [nombreEquipo, setNombreEquipo] = useState('');

  const handleCrear = () => {
    navigation.navigate('CuentaDueno'); // Redirige sin pasar datos (pantalla sin equipo)
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Triángulo y Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegra]} />
      <View style={[styles.franja, styles.franjaGris]} />

      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro de Equipo</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Datos del Equipo</Text>

      {/* Imagen placeholder en línea */}
      <Image
        source={{ uri: 'https://placehold.co/120x120?text=Logo' }}
        style={styles.image}
      />

      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadText}>Cargar imagen</Text>
      </TouchableOpacity>

      {/* Campo de texto */}
      <TextInput
        placeholder="Nombre del Equipo"
        placeholderTextColor="#888"
        style={styles.input}
        value={nombreEquipo}
        onChangeText={setNombreEquipo}
      />

      {/* Botones */}
      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.btnTexto}>Crear</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonCancelar} onPress={handleCancelar}>
        <Text style={styles.btnTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },
  triangleTopRed: {
    position: 'absolute',
    top: 0, left: 0,
    width: 0, height: 0,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 30,
    width: '100%',
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginVertical: 12,
  },
  uploadBtn: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  uploadText: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    width: '80%',
    marginTop: 16,
    color: '#000',
  },
  botonCrear: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  botonCancelar: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});