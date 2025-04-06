import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CuentaArbitroScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Triángulos y franjas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />

      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      {/* Contenido centrado */}
      <View style={styles.content}>
        {/* Perfil */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/arbitro.jpg')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.rolBadge}>
            <Text style={styles.rolText}>Árbitro</Text>
          </TouchableOpacity>
        </View>

        {/* Info tarjeta */}
        <View style={styles.cardInfo}>
          <Text style={styles.name}>Juan Chavez</Text>
          <Text style={styles.text}>20233tn152@utez.edu.mx</Text>
          <Text style={styles.text}>7772074581</Text>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../../assets/manhattan_logo.jpg')}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#000',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: 30,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
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
  },
  franjaNegraTop: {
    top: 60,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
    zIndex: 0,
  },
  franjaGrisTop: {
    top: 100,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
    zIndex: 0,
  },
  franjaGrisBottom: {
    bottom: -30,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
    zIndex: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  rolBadge: {
    backgroundColor: '#0e1b39',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
