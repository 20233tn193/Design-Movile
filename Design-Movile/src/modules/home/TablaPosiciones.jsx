import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const datos = Array(6).fill({
  equipo: 'Madrid',
  logo: require('../../../assets/Madrid.jpg'),
  pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
});

export default function TablaPosiciones() {
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
      <Image source={require('../../../assets/Posiciones.jpg')} style={styles.icono} />      
       <Text style={styles.headerText}> Tabla de Posiciones</Text>
      </View>

      

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { width: 100 }]}>Equipo</Text>
        <Text style={styles.columnHeader}>PJ</Text>
        <Text style={styles.columnHeader}>PG</Text>
        <Text style={styles.columnHeader}>PE</Text>
        <Text style={styles.columnHeader}>PP</Text>
        <Text style={styles.columnHeader}>GF</Text>
        <Text style={styles.columnHeader}>GC</Text>
        <Text style={styles.columnHeader}>Pts</Text>
      </View>

      <FlatList
        data={datos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.equipo}>
              <Image source={item.logo} style={styles.logo} />
              <Text style={styles.equipoText}>{item.equipo}</Text>
            </View>
            <Text style={styles.column}>{item.pj}</Text>
            <Text style={styles.column}>{item.pg}</Text>
            <Text style={styles.column}>{item.pe}</Text>
            <Text style={styles.column}>{item.pp}</Text>
            <Text style={styles.column}>{item.gf}</Text>
            <Text style={styles.column}>{item.gc}</Text>
            <Text style={styles.column}>{item.pts}</Text>
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
    marginTop: 15,
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1f2d5a',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    width: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  equipoText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  column: {
    width: 30,
    textAlign: 'center',
    fontSize: 12,
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