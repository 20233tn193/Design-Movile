import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginDuenoScreen({ navigation }) {
  console.log("🚀 LoginDuenoScreen cargado");
  return (
    <SafeAreaView style={styles.container}>
      {/* Triángulo rojo superior */}
      <View style={styles.triangleTopRed} />

      {/* Franjas inclinadas superiores */}
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inclinadas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.content}>
        <Image source={require('../../../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.titulo}>Inicio de Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#555"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.btnIngresar}
          onPress={() => navigation.navigate('CuentaDueno')}
        >
          <Text style={styles.btnTexto}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.btnRegistrarse}
  onPress={() => navigation.navigate('RegistroDueno')} // ✅ esta debe ser la ruta del Stack
>
  <Text style={styles.btnTexto}>Registrarse</Text>
</TouchableOpacity>



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    zIndex: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },
  btnIngresar: {
    backgroundColor: '#d80027',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnRegistrarse: {
    backgroundColor: '#0e1b39',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnTexto: {
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
    zIndex: 3,
  },

  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaNegraTop: {
    top: 50,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 80,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 40,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 5,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: -30,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
});
