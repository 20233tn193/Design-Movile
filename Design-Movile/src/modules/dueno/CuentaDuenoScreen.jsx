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

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Triángulo y franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.rowTop}>
            <View style={styles.fotoPlaceholder} />
            <View style={styles.estadoEquipo}>
              <Text style={styles.estadoTexto}>Sin equipo</Text>
            </View>
          </View>

          <Text style={styles.nombre}>Juan Chavez</Text>
          <Text style={styles.dato}>20233tn152@utez.edu.mx</Text>
          <Text style={styles.dato}>7772074581</Text>

          {/* Botón de edición (navega a ActualizarEquipoScreen) */}
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('ActualizarCuentaDueno')}
          >
            <Icon name="edit" type="feather" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Botones */}
        <TouchableOpacity style={styles.botonAzul} onPress={() => navigation.navigate('RegistroEquipoDueno')}>
          <Text style={styles.botonTexto}>Crear Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonRojo} onPress={handleLogout}>
          <Text style={styles.botonTexto}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../../assets/manhattan_logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => navigation.navigate('TorneoScreen')}>
          <Icon name="trophy" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CuentaDuenoScreen')}>
          <Icon name="user" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Estadisticas')}>
          <Icon name="bar-chart" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative' },
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
    zIndex: 0,
  },
  franjaNegraTop: {
    top: 60,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 30,
    width: '100%',
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    marginBottom: 20,
    position: 'relative',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fotoPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  estadoEquipo: {
    backgroundColor: '#001F4E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  dato: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  botonAzul: {
    backgroundColor: '#001F4E',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonRojo: {
    backgroundColor: '#B80000',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 160,
    height: 60,
    marginTop: 25,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
