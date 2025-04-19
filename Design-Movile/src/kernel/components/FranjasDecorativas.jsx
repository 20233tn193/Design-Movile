import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FranjasDecorativas = () => {
  return (
    <View style={styles.backgroundContainer}>
      {/* Franjas superiores (ajustadas más abajo) */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
  },
  franjaRojaTop: {
    top: 30, // antes 0
    left: -width / 2,
    backgroundColor: '#d80027',
    height: 80,
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90, // antes 60
    left: -width / 2,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 120, // antes 90
    left: -width / 2,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 70,
    left: -width / 2,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 35,
    left: -width / 2,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: 0,
    left: -width / 2,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
});

export default FranjasDecorativas;
