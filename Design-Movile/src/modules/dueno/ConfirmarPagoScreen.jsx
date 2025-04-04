import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function ConfirmarPagoScreen({ navigation }) {
  const handleAceptar = () => {
    navigation.navigate('StripePaymentScreen');
  };

  return (
    <View style={styles.container}>
      {/* Triángulo rojo y franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Detalles del Torneo</Text>
      </View>

      {/* Contenedor de confirmación */}
      <View style={styles.confirmCard}>
        <Text style={styles.title}>Confirmar</Text>
        <Text style={styles.message}>
          <Text style={{ fontWeight: 'bold' }}>Será redirigido a Stripe</Text> para realizar su pago
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAceptar}>
            <Text style={styles.acceptText}>ACEPTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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
    zIndex: 0,
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
    position: 'absolute',
    top: 35,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  confirmCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '85%',
  },
  title: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});