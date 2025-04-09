import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const roles = decoded.roles || [];

          if (roles.includes('ARBITRO')) {
            console.log('⏩ Redirigiendo a ArbitroHomeScreen...');
            navigation.replace('ArbitroHomeScreen');
          } else if (roles.includes('DUENO')) {
            console.log('⏩ Redirigiendo a CuentaDuenoScreen...');
            navigation.replace('CuentaDuenoScreen');
          } else {
            console.log('⏩ Rol no reconocido, redirigiendo a login...');
            navigation.replace('LoginScreen');
          }
        } catch (error) {
          console.error('⛔ Token inválido. Redirigiendo a login...');
          navigation.replace('LoginScreen');
        }
      } else {
        console.log('🔒 No hay token. Redirigiendo a login...');
        navigation.replace('LoginScreen');
      }
    };

    setTimeout(verificarSesion, 1000); // Simula carga breve
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.text}>GTF</Text>
      <Text style={styles.subtext}>Sistema de Gestión de Torneos de Fútbol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  logo: {
    width: 100, height: 100, borderRadius: 50,
  },
  text: {
    fontSize: 40, fontWeight: 'bold', color: '#d80027', marginTop: 20,
  },
  subtext: {
    fontSize: 16, color: '#0e1b39', marginTop: 5,
  },
});
