import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

console.log('🎯 RegistroEquipoDueno cargado');
export default function RegistroEquipoDueno({ navigation }) {
  console.log('🎯 RegistroEquipoDueno cargado');

  const [nombreEquipo, setNombreEquipo] = useState('');

  const handleCrear = () => {
  console.log('🟢 Botón CREAR presionado');

  if (!nombreEquipo.trim()) {
    alert('Por favor ingresa el nombre del equipo');
    return;
  }

  navigation.navigate('CuentaDueno', {
    nombreEquipo: nombreEquipo,
    escudo: require('../../../assets/Barcelona.jpg'), // o tu imagen real
  });
}
  
  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Decoración */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="users" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro de Equipo</Text>
      </View>

      <Text style={styles.titulo}>Datos del Equipo</Text>

      {/* Imagen placeholder */}
      <View style={styles.imagenBox}>
        <View style={styles.placeholder} />
        <TouchableOpacity style={styles.btnCargar}>
          <Text style={styles.btnCargarTexto}>Cargar imagen</Text>
        </TouchableOpacity>
      </View>

      {/* Campo Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Equipo"
        placeholderTextColor="#555"
        value={nombreEquipo}
        onChangeText={setNombreEquipo}
      />

      {/* Botones */}
      <TouchableOpacity style={styles.btnCrear} onPress={handleCrear}>
        <Text style={styles.btnTexto}>Crear</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCancelar} onPress={handleCancelar}>
        <Text style={styles.btnTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 20 },
  triangleTopRed: {
    position: 'absolute', top: 0, left: 0, width: 0, height: 0,
    borderTopWidth: 100, borderRightWidth: width * 2,
    borderTopColor: '#d80027', borderRightColor: 'transparent', zIndex: 1,
  },
  franja: {
    position: 'absolute', width: width * 2, height: 50, zIndex: 0,
  },
  franjaNegraTop: {
    top: 80, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 110, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }],
  },
  header: {
    flexDirection: 'row', backgroundColor: '#000', padding: 12, alignItems: 'center',
    width: '100%', paddingTop: 30, zIndex: 10,
  },
  headerText: {
    color: '#FDBA12', fontSize: 18, fontWeight: 'bold',
  },
  titulo: {
    fontSize: 18, fontWeight: 'bold', color: '#fff',
    backgroundColor: '#0e1b39', paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 10, overflow: 'hidden', marginTop: 20,
  },
  imagenBox: { marginTop: 20, alignItems: 'center' },
  placeholder: {
    width: 160, height: 160, backgroundColor: '#ccc', borderRadius: 10, marginBottom: 10,
  },
  btnCargar: {
    backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10,
  },
  btnCargarTexto: {
    color: '#FDBA12', fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    width: '100%',
    color: '#000',
  },
  btnCrear: {
    backgroundColor: '#d80027',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  btnCancelar: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  btnTexto: {
    color: '#fff', fontWeight: 'bold', fontSize: 14,
  },
});
