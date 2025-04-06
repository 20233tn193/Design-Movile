import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function ConfirmarInscripcionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Detalles del Torneo</Text>
      </View>

      <View style={styles.cardModal}>
        <Text style={styles.title}> ¿Inscribirse a "Torneo Infantil"?</Text>
        <Text style={styles.subtitle}>Esta acción requiere realizar un pago.</Text>

        <View style={styles.rowButtons}>
          <TouchableOpacity style={styles.btnPagar} onPress={() => navigation.navigate('PagoStripe')}>
            <Text style={styles.btnPagarText}>PAGAR INSCRIPCIÓN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.btnCancelarText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    paddingTop: 30,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  cardModal: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d80027',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnPagar: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  btnCancelar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  btnPagarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnCancelarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
});