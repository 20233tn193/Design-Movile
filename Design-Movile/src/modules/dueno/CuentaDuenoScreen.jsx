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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* 🎨 Fondo decorativo (franjas como LoginScreen) */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
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

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('ActualizarCuentaDueno')}
          >
            <Icon name="edit" type="feather" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botonAzul} onPress={() => navigation.navigate('RegistroEquipoDueno')}>
          <Text style={styles.botonTexto}>Crear Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonRojo} onPress={handleLogout}>
          <Text style={styles.botonTexto}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Image
          source={require('../../../assets/manhattan_logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Tabs */}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 60,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 120,
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
    zIndex: 2,
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
    paddingTop: 120, // ✅ más abajo y centrado
    zIndex: 3,
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
    zIndex: 5,
  },
});
