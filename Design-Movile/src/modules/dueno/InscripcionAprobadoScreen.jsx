import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function InscripcionAprobadoScreen() {
  return (
    <View style={styles.container}>
      {/* Franjas superiores */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Inscripciones</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Torneos inscritos</Text>
          <View style={styles.cardTorneo}>
            <Image source={require('../../../assets/madrid.png')} style={styles.logo} />
            <View>
              <Text style={styles.nombreTorneo}>Torneo Infantil</Text>
              <Text style={styles.estadoAprobado}>Pago APROBADO</Text>
              <Text style={styles.fecha}>05/03/2025    10 clubs</Text>
            </View>
            <Icon name="users" type="font-awesome" color="white" style={{ marginLeft: 'auto' }} />
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Torneos Disponibles</Text>
          {/* Aquí se pueden mapear tarjetas como en pantallas anteriores */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', position: 'relative' },
  header: {
    backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 15,
    flexDirection: 'row', alignItems: 'center', paddingTop: 30,
  },
  headerText: { color: '#FDBA12', fontWeight: 'bold', fontSize: 18, marginLeft: 10 },
  seccion: { marginTop: 20, paddingHorizontal: 15 },
  seccionTitulo: {
    backgroundColor: '#0e1b39', color: '#FDBA12', fontWeight: 'bold', padding: 10,
    borderRadius: 5, marginBottom: 10, textAlign: 'center', fontSize: 14,
  },
  cardTorneo: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e1b39',
    borderRadius: 12, padding: 12, marginBottom: 10,
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  nombreTorneo: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  estadoAprobado: { color: 'limegreen', fontWeight: 'bold', fontSize: 12 },
  fecha: { color: 'white', fontSize: 12 },
  franja: {
    position: 'absolute', width: width * 2, height: 50, zIndex: -1,
  },
  franjaRojaTop: {
    top: 60, left: -width, backgroundColor: '#d80027', transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 120, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 70, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 35, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: 0, left: -width, backgroundColor: '#d80027', transform: [{ rotate: '10deg' }],
  },
});