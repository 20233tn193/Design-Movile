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
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Cuenta</Text>
      </View>

      {/* Card de información */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.estado}>
            <Text style={styles.estadoText}>Sin equipo</Text>
          </View>
        </View>
        <Text style={styles.nombre}>Juan Chavez</Text>
        <Text style={styles.info}>20233tn152@utez.edu.mx</Text>
        <Text style={styles.info}>7772074581</Text>
        <TouchableOpacity style={styles.iconoEditar}>
          <Icon name="edit" type="feather" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <TouchableOpacity
        style={styles.botonCrear}
        onPress={() => navigation.navigate('RegistroEquipoDueno')}
      >
        <Text style={styles.textoBoton}>Crear Equipo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonCerrar}
        onPress={() => navigation.replace('LoginScreen')}
      >
        <Text style={styles.textoBoton}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../../assets/manhattan_logo.jpg')}
        style={styles.logo}
      />

      {/* Navegación inferior */}
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
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    width: '100%',
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
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
    zIndex: -1,
  },
  franjaNegraTop: {
    top: 80,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 100,
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
  card: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    marginTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    position: 'relative',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  estado: {
    backgroundColor: '#001F4E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  iconoEditar: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  botonCrear: {
    backgroundColor: '#001F4E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 25,
  },
  botonCerrar: {
    backgroundColor: '#B80000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
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
