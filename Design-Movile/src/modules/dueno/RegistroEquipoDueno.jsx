import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function RegistroEquipoDueno({ navigation }) {
  const [nombreEquipo, setNombreEquipo] = useState('');

  const handleCrear = () => {
    navigation.navigate('CuentaDuenoEquipo');
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Triángulo y Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Encabezado */}
      <View style={styles.header}>
  <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
  <Text style={styles.headerText}>Registro de Equipo</Text>
</View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>Datos del Equipo</Text>

        <Image
          source={{ uri: 'https://placehold.co/120x120?text=Logo' }}
          style={styles.image}
        />

        <TouchableOpacity style={styles.botonUniforme}>
          <Text style={styles.botonTextoNegro}>Cargar imagen</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Nombre del Equipo"
          placeholderTextColor="#888"
          style={styles.input}
          value={nombreEquipo}
          onChangeText={setNombreEquipo}
        />

        <TouchableOpacity style={styles.botonRojo} onPress={handleCrear}>
          <Text style={styles.botonTexto}>Crear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonGris} onPress={handleCancelar}>
          <Text style={styles.botonTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 70,
    borderRightWidth: width * 2,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 40,
    zIndex: 0,
  },
  franjaNegraTop: {
    top: 60,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 30,
    width: '100%',
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    width: '80%',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  botonUniforme: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonRojo: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonGris: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botonTextoNegro: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
