import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function CuentaDuenoScreen({ route, navigation }) {
  const { nombreEquipo, escudo } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Triángulo y Franjas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegra]} />
      <View style={[styles.franja, styles.franjaGris]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
        <Image
         source={escudo ? escudo : require('../../../assets/Barcelona.jpg')}
          style={styles.escudo}
        />

          <View style={styles.nombreEquipoBox}>
            <Text style={styles.nombreEquipo}>{nombreEquipo || 'Sin equipo'}</Text>
            <Icon name="pencil" type="font-awesome" size={12} color="#fff" containerStyle={styles.editIcon} />
          </View>
        </View>

        <Text style={styles.nombre}>Juan Chavez</Text>
        <Text style={styles.dato}>20233tn152@utez.edu.mx</Text>
        <Text style={styles.dato}>7772074581</Text>
        <Icon name="pencil" type="font-awesome" size={12} color="#000" containerStyle={styles.editIconAbajo} />
      </View>

      {/* Botones */}
      <TouchableOpacity style={styles.botonAzul}>
        <Text style={styles.btnTexto}>Torneos Inscritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonRojo}>
        <Text style={styles.btnTexto}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../../assets/manhattan_logo.jpg')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
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
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    width: '85%',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  escudo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  nombreEquipoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1b39',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  nombreEquipo: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  dato: {
    fontSize: 14,
    color: '#333',
  },
  editIcon: {
    marginLeft: 4,
  },
  editIconAbajo: {
    marginTop: 6,
  },
  botonAzul: {
    backgroundColor: '#0e1b39',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  botonRojo: {
    backgroundColor: '#d80027',
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
  logo: {
    marginTop: 30,
    width: 140,
    height: 60,
    resizeMode: 'contain',
  },
});
