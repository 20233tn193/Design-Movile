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
        placeholder="CURP"
        style={styles.input}
        value={curp}
        onChangeText={setCurp}
      />
      <TextInput
        placeholder="Fecha de nacimiento"
        style={styles.input}
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
    padding: 12,
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
    width: 120,
    height: 140,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  btnCargarImagen: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoCargar: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnAgregar: {
    flex: 1,
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});