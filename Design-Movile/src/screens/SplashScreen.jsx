import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import jwtDecode from 'jwt-decode';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('🪪 Token recuperado:', token);

      if (!token || token.split('.').length !== 3) {
        console.warn('⚠️ Token inválido o mal formado:', token);
        await AsyncStorage.removeItem('token');
        navigation.replace('BottomTabs');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log('✅ Token decodificado:', decoded);

        const roles = decoded.roles || [];

        if (roles.includes('ARBITRO')) {
          console.log('⏩ Redirigiendo a ArbitroHomeScreen...');
          navigation.replace('ArbitroHomeScreen');
        } else if (roles.includes('DUENO')) {
          console.log('⏩ Redirigiendo a CuentaDuenoScreen...');
          navigation.replace('CuentaDuenoScreen');
        } else {
          console.log('❓ Rol no reconocido. Redirigiendo a login...');
          await AsyncStorage.removeItem('token');
          navigation.replace('BottomTabs');
        }
      } catch (error) {
        console.error('⛔ Error al decodificar el token:', error.message);
        await AsyncStorage.removeItem('token');
        navigation.replace('BottomTabs');
      }
    };

    setTimeout(verificarSesion, 1000); // Simula carga breve de splash
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