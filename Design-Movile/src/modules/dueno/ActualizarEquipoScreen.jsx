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
import ModalConfirmarEliminacion from './ModalConfirmarEliminacion'; // Ajusta esta ruta si es necesario

const { width } = Dimensions.get('window');

export default function ActualizarEquipoScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEliminar = () => {
    setModalVisible(true);
  };

  const confirmarEliminacion = () => {
    setModalVisible(false);
    navigation.goBack(); // Puedes reemplazar esto con tu lógica de eliminación real
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Actualizar Equipo</Text>
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

      <TouchableOpacity style={styles.botonNegro}>
        <Text style={styles.botonTexto}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonRojo} onPress={handleEliminar}>
        <Text style={styles.botonTexto}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonGris} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>

      {/* Modal */}
      <ModalConfirmarEliminacion
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEliminar={confirmarEliminacion}
      />
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
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
    width: '80%',
    borderRadius: 10,
    padding: 12,
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  botonNegro: {
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
    backgroundColor: '#555',
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
});
