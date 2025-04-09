import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const rotation = useRef(new Animated.Value(0)).current;
    const spin = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();


    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const roles = decoded.roles || [];

          if (roles.includes('ARBITRO')) {
            navigation.replace('ArbitroHomeScreen');
          } else if (roles.includes('DUENO')) {
            navigation.replace('CuentaDuenoScreen');
          } else {
            navigation.replace('BottomTabs');
          }
        } catch (error) {
          navigation.replace('BottomTabs');
        }
      } else {
        navigation.replace('BottomTabs');
      }
    };
  

    setTimeout(verificarSesion, 2500); // Simula carga
  }, []);



  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Contenido principal */}
      <Animated.Image
        source={require('../../assets/logo.jpg')}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />
      <Text style={styles.text}>GTF</Text>
      <Text style={styles.subtext} >Sistema de Gestión de Torneos de Fútbol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 100, height: 100, borderRadius: 50,
  },
  text: {
    fontSize: 48, // 👈 más grande
    fontWeight: '900', // 👈 extra negrita
    color: '#d80027',
    marginTop: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtext: {
    fontSize: 18,
    color: '#0e1b39',
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 10, // << subimos esto para ver si aparecen
  },
  franjaRojaTop: {
    top: 0,
    left: -width,
    backgroundColor: '#d80027',
    height: 80,
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 60,
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