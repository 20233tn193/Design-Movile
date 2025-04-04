import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const datos = Array(5).fill({
  nombre: 'Hanna Perez',
  equipo: 'Madrid',
  goles: 23,
  logo: require('../../../assets/Madrid.jpg'),
});

export default function GoleadoresScreen() {
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
      <Image source={require('../../../assets/Goleadores.jpg')} style={styles.icono} />  
      <Text style={styles.title}> Goleadores</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Nombre</Text>
        <Text style={styles.columnHeader}>Equipo</Text>
        <Text style={styles.columnHeader}>Goles</Text>
      </View>

      <FlatList
        data={datos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.nombre}</Text>
            <View style={styles.equipo}>
              <Image source={item.logo} style={styles.logo} />
              <Text style={styles.equipoText}>{item.equipo}</Text>
            </View>
            <Text style={styles.column}>{item.goles}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    paddingTop: 30,
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#1f2d5a',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 13,
    width: 90,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  column: {
    fontSize: 12,
    width: 90,
    textAlign: 'center',
  },
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipoText: {
    marginLeft: 5,
    fontSize: 12,
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
