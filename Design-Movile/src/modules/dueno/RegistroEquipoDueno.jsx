import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Dimensions, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function RegistroEquipoDueno({ navigation }) {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [logoUri, setLogoUri] = useState(null);

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

  const handleCrear = async () => {
    if (!nombreEquipo || !logoUri) {
      Alert.alert('Datos incompletos', 'Debes ingresar el nombre del equipo y cargar un logo');
      return;
    }
  
    const nombreLimpio = nombreEquipo.trim();
  
    if (nombreLimpio.length < 3) {
      Alert.alert('Nombre muy corto', 'El nombre debe tener al menos 3 caracteres');
      return;
    }
  
    if (nombreLimpio.length > 20) {
      Alert.alert('Nombre muy largo', 'El nombre no debe exceder los 30 caracteres');
      return;
    }
  
    try {
      const duenoId = await AsyncStorage.getItem('duenoId');
  
      const nuevoEquipo = {
        nombre: nombreLimpio,
        logoUrl: logoUri,
        duenoId,
        eliminado: false,
        partidosGanados: 0,
        partidosPerdidos: 0,
      };
  
      await API.post('/equipos', nuevoEquipo);
  
      Alert.alert('Equipo registrado', 'Tu equipo fue creado exitosamente', [
        { text: 'OK', onPress: () => navigation.replace('BottomTabs', { screen: 'Perfil' }) },
      ]);
    } catch (error) {
      console.log('❌ Error al crear equipo:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo registrar el equipo');
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Decoración */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro de Equipo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Datos del Equipo</Text>

        <Image
          source={logoUri ? { uri: logoUri } : require('../../../assets/placeholder.png')}
          style={styles.image}
        />
        <Text style={styles.textoResolucion}>Tamaño recomendado: 300x300 px</Text>



        <TextInput
          placeholder="Nombre del Equipo"
          placeholderTextColor="#888"
          style={styles.input}
          value={nombreEquipo}
          onChangeText={setNombreEquipo}
        />

        <TouchableOpacity style={styles.botonUniforme} onPress={handleSeleccionarImagen}>
          <Text style={styles.botonTextoNegro}>Cargar imagen</Text>
        </TouchableOpacity>

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
    paddingTop: 50,
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
    paddingTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginBottom: 10,
  },
  textoResolucion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    width: '80%',
    marginBottom: 50,
    color: '#000',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  botonUniforme: {
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
