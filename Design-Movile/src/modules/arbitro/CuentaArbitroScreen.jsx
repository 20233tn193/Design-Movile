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

export default function CuentaDuenoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      {/* Contenido centrado */}
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.estadoEquipo}>
            <Text style={styles.estadoTexto}>Sin equipo</Text>
          </View>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.name}>Juan Chavez</Text>
          <Text style={styles.text}>20233tn152@utez.edu.mx</Text>
          <Text style={styles.text}>7772074581</Text>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('RegistroEquipoDueno')}>
          <Text style={styles.buttonText}>Crear Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Image source={require('../../../assets/manhattan_logo.jpg')} style={styles.logo} />
      </View>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => navigation.navigate('TorneoScreen')}>
          <Icon name="trophy" type="font-awesome" color="#fff" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Icon name="user" type="font-awesome" color="#fff" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Estadisticas')}>
          <Icon name="bar-chart" type="font-awesome" color="#fff" size={22} />
        </TouchableOpacity>
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
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 15,
  },
  estadoEquipo: {
    backgroundColor: '#001F4E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
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
  createButton: {
    backgroundColor: '#001F4E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
