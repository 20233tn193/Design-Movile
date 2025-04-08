import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function TournamentDetail({ route, navigation }) {
  const { nombre, torneoId } = route.params; // ahora también recibimos torneoId

  const buttons = [
    { label: 'Tabla de Posiciones', icon: require('../../../assets/Posiciones.png'), ruta: 'TablaPosiciones' },
    { label: 'Próximos Partidos', icon: require('../../../assets/ProximosPartidos.png'), ruta: 'Partidos' },
    { label: 'Maximos Goleadores', icon: require('../../../assets/Goleadores.png'), ruta: 'Goleadores' },
    { label: 'Tarjetas', icon: require('../../../assets/Tarjetas.png'), ruta: 'Tarjetas' },
  ];

  return (
    <View style={styles.container}>
      {/* Franjas superiores */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.header}>
        <Image source={require('../../../assets/TorneoABC.jpg')} style={styles.icono} />
        <Text style={styles.title}> {nombre}</Text>
      </View>

      <View style={styles.options}>
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => navigation.navigate(btn.ruta, { torneoId })} // pasamos torneoId
          >
            <Image source={btn.icon} style={styles.iconoBoton} />
            <Text style={styles.text}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop: 30,
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icono: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  options: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#101e3d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    height: 90,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  iconoBoton: {
    width: 30,
    height: 30,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: -1,
  },
  franjaGrisTop: {
    top: 120,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaRojaTop: {
    top: 60,
    left: -width,
    backgroundColor: '#d80027',
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
