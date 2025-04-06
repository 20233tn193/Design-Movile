import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const partidos = [
  {
    local: { nombre: 'Madrid', logo: require('../../../assets/madrid.png') },
    visitante: { nombre: 'Juventus', logo: require('../../../assets/Juventus.jpg') },
    resultado: '1 : 0',
    cancha: 'Los Tamales - Verde',
    hora: '10:00 am',
    arbitro: 'Juan Chavez'
  },
  {
    local: { nombre: 'Paris', logo: require('../../../assets/paris.png') },
    visitante: { nombre: 'Barcelona', logo: require('../../../assets/barcelona.png') },
    resultado: '2 : 1',
    cancha: 'Los Tamales - Rojo',
    hora: '12:00 pm',
    arbitro: 'Juan Chavez'
  },
];

export default function PartidosScreen() {
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

      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../../../assets/ProximosPartidos.png')} style={styles.icono} />
        <Text style={styles.headerText}> Partidos</Text>
      </View>

      {/* Jornada */}
      <View style={styles.jornadaContainer}>
        <Text style={styles.jornadaText}>
          <Text style={styles.jornadaBold}>Jornada 1</Text>
          <Text style={styles.jornadaSeparador}>   -   </Text>
          <Text style={styles.jornadaBold}>Domingo 23/03/2025</Text>
        </Text>
      </View>

      <FlatList
        data={partidos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image source={item.local.logo} style={styles.logo} />
              <Text style={styles.resultado}>{item.resultado}</Text>
              <Image source={item.visitante.logo} style={styles.logo} />
            </View>

            <View style={styles.nombres}>
              <Text style={styles.nombreEquipo}>{item.local.nombre}</Text>
              <Text style={styles.nombreEquipo}>{item.visitante.nombre}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.infoText}>{item.cancha}</Text>
                <Text style={styles.infoText}>{item.hora}</Text>
                <Text style={styles.arbitro}>{item.arbitro}</Text>
              </View>
              <Icon name="map-marker-alt" type="font-awesome-5" color="#d80027" size={20} />
            </View>
          </View>
        )}
      />

  
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
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    paddingTop: 30,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  jornadaContainer: {
    backgroundColor: '#0e1b39',
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  jornadaText: {
    fontSize: 15,
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  jornadaBold: {
    fontWeight: 'bold',
    color: '#FDBA12',
  },
  jornadaSeparador: {
    color: '#FDBA12',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 14,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 5,
  },
  nombreEquipo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
  },
  arbitro: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
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
  icono: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  }
});
