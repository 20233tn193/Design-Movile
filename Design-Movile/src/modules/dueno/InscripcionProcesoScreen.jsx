import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function InscripcionProcesoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={22} />
        <Text style={styles.headerText}> Inscripciones</Text>
      </View>

      {/* Título sección */}
      <Text style={styles.sectionTitle}>Torneos inscritos</Text>

      <View style={styles.cardTorneo}>
        <Image source={require('../../../assets/Madrid.jpg')} style={styles.logo} />
        <View>
          <Text style={styles.nombre}>Torneo Infantil</Text>
          <Text style={styles.estadoProceso}>Pago en PROCESO</Text>
          <Text style={styles.info}>05/03/2025   10 clubs</Text>
        </View>
      </View>

      {/* Modal tipo mensaje */}
      <View style={styles.modalInfo}>
        <Text style={styles.modalTitle}>Información</Text>
        <Text style={styles.modalText}>
          Una vez que su pago haya sido <Text style={{ color: 'limegreen', fontWeight: 'bold' }}>APROBADO</Text>, podrá registrar a sus jugadores al torneo
        </Text>
        <TouchableOpacity style={styles.btnAceptar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnAceptarText}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden'
  },
  triangleTopRed: {
    position: 'absolute',
    top: 10,
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
    zIndex: 1,
  },
  franjaNegraTop: {
    top: 80,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 90,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingTop: 30,
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2d5a'
  },
  cardTorneo: {
    backgroundColor: '#0e1b39',
    marginHorizontal: 15,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  nombre: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  estadoProceso: {
    color: '#FDBA12',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    color: '#ccc',
    fontSize: 11,
  },
  modalInfo: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2d5a',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 20,
  },
  btnAceptar: {
    backgroundColor: '#FDBA12',
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnAceptarText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
