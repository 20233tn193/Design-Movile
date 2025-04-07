import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function RegistroJugadorScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [curp, setCurp] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Registro</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={styles.franjaNegraTop} />
      <View style={styles.franjaGrisTop} />

      {/* Imagen Placeholder */}
      <Image
        source={{ uri: 'https://placehold.co/120x140?text=Foto' }}
        style={styles.placeholderImage}
      />
      <TouchableOpacity style={styles.btnCargarImagen}>
        <Text style={styles.textoCargar}>Cargar imagen</Text>
      </TouchableOpacity>

      {/* Formulario */}
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        placeholderTextColor="#444"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        placeholderTextColor="#444"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="CURP"
        style={styles.input}
        placeholderTextColor="#444"
        value={curp}
        onChangeText={setCurp}
      />
      <TextInput
        placeholder="Fecha de nacimiento"
        style={styles.input}
        placeholderTextColor="#444"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.btnCancelar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTexto}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgregar}>
          <Text style={styles.btnTexto}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    position: 'absolute',
    top: 75,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    position: 'absolute',
    top: 100,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  placeholderImage: {
    width: 140,
    height: 160,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  btnCargarImagen: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoCargar: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#555',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnAgregar: {
    flex: 1,
    backgroundColor: '#d80027',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
