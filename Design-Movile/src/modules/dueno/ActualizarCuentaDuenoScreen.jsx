import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function ActualizarCuentaDuenoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado con ícono y texto */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Actualizar Cuenta</Text>
      </View>

      {/* Franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingrese sus datos</Text>

        <TextInput placeholder="Nombre" style={styles.input} />
        <TextInput placeholder="Apellido" style={styles.input} />
        <TextInput placeholder="20233tn152@utez.edu.mx" style={styles.input} />
        <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
        <TextInput placeholder="Confirmar contraseña" secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.botonPrimario}>
          <Text style={styles.botonTexto}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botonTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 10,
  },
  headerText: { color: '#FDBA12', fontSize: 18, fontWeight: 'bold' },

  content: {
    zIndex: 10,
    width: '85%',
    alignSelf: 'center',
    marginTop: 60,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0e1b39',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  botonPrimario: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#4d4d4d',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width,
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
  franjaNegraTop: {
    top: 70,
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
    bottom: 50,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 20,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: -10,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
});