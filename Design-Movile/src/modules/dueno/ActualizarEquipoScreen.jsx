import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import API from '../../api/api';
import ModalConfirmarEliminacion from './ModalConfirmarEliminacion';

const { width } = Dimensions.get('window');

export default function ActualizarEquipoScreen({ navigation, route }) {
  const { equipo } = route.params || {};
  const [nombreEquipo, setNombreEquipo] = useState(equipo?.nombre || '');
  const [logoUri, setLogoUri] = useState(equipo?.logoUrl || '');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSeleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!resultado.canceled) {
      setLogoUri(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  };

  const handleActualizar = async () => {
    if (!nombreEquipo || !logoUri) {
      Alert.alert('Campos requeridos', 'Nombre e imagen son obligatorios');
      return;
    }

    try {
      const actualizado = {
        nombre: nombreEquipo,
        logoUrl: logoUri,
        duenoId: equipo.duenoId,
        eliminado: equipo.eliminado,
        partidosGanados: equipo.partidosGanados,
        partidosPerdidos: equipo.partidosPerdidos,
      };

      await API.put(`/equipos/${equipo.id}`, actualizado);

      Alert.alert('Actualizado', 'El equipo se actualizó correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'Perfil' }) },
      ]);
    } catch (error) {
      console.log('❌ Error actualizando equipo:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo actualizar el equipo');
    }
  };

  const confirmarEliminacion = async () => {
    try {
      await API.delete(`/equipos/${equipo.id}`);
      setModalVisible(false);
      Alert.alert('Eliminado', 'El equipo ha sido eliminado', [
        { text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'Perfil' }) },
      ]);
    } catch (error) {
      console.log('❌ Error eliminando equipo:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo eliminar el equipo');
    }
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

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Actualizar Equipo</Text>
      </View>

      <Text style={styles.titulo}>Datos del Equipo</Text>

      <Image
        source={{ uri: logoUri }}
        style={styles.imagenEscudo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.botonImagen} onPress={handleSeleccionarImagen}>
        <Text style={styles.botonImagenTexto}>Cargar imagen</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={nombreEquipo}
        onChangeText={setNombreEquipo}
        placeholder="Nombre del equipo"
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={styles.botonNegro} onPress={handleActualizar}>
        <Text style={styles.botonTexto}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonRojo} onPress={() => setModalVisible(true)}>
        <Text style={styles.botonTexto}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonGris} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>

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
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 125, // espacio suficiente para header + franjas
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingTop: 50,
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 80,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 120,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 150,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 70,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaNegraBottom: {
    bottom: 35,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaRojaBottom: {
    bottom: 0,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  imagenEscudo: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginBottom: 5,
  },
  botonImagen: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 10,
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
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  botonNegro: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  botonRojo: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
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