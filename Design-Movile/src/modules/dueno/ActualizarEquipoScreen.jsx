import React from 'react';
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

export default function ActualizarEquipoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header superior */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Actualizar Equipo</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.franjaRoja} />
      <View style={styles.franjaNegra} />
      <View style={styles.franjaGris} />

      <Text style={styles.titulo}>Datos del Equipo</Text>

      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }}
        style={styles.imagenEscudo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.botonImagen}>
        <Text style={styles.botonImagenTexto}>Cargar imagen</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Barcelona"
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={styles.botonActualizar}>
        <Text style={styles.botonTexto}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonEliminar}>
        <Text style={styles.botonTexto}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonCancelar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 140,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    width: '100%',
    padding: 12,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
  },
  franjaRoja: {
    position: 'absolute',
    top: 50,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegra: {
    position: 'absolute',
    top: 75,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGris: {
    position: 'absolute',
    top: 100,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  imagenEscudo: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  botonImagen: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 20,
  },
  botonImagenTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#eee',
    width: '100%',
    borderRadius: 10,
    padding: 12,
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 16,
  },
  botonActualizar: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonEliminar: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonCancelar: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
