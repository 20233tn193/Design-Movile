import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const partidos = Array(5).fill({
  equipoLocal: 'Juventus',
  equipoVisitante: 'Madrid',
  cancha: 'Los Tamales - Verde',
  fecha: '23/03/2025',
  hora: '10:00 am',
});

export default function ArbitroHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Triángulo superior y franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../../../assets/ProximosPartidos.jpg')} style={styles.iconoHeader} />
        <Text style={styles.headerText}>Partidos Asignados</Text>
      </View>

      {/* Buscador */}
      <View style={styles.buscadorContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#555"
          style={styles.inputBuscar}
        />
        <TouchableOpacity style={styles.btnBuscar}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={partidos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetallePartido')}>
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.vsText}>
                  {item.equipoLocal} vs {item.equipoVisitante}
                </Text>
                <Text style={styles.cardSubText}>{item.cancha}</Text>
                <Text style={styles.cardSubText}>{item.fecha}    {item.hora}</Text>
              </View>
              <Image source={require('../../../assets/ubicacion.jpg')} style={styles.ubicacionIcon} />
            </View>
          </TouchableOpacity>
        )}
      />

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
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  iconoHeader: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buscadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    zIndex: 10,
  },
  inputBuscar: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  btnBuscarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#0e1b39',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  vsText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardSubText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 2,
  },
  ubicacionIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  triangleTopRed: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 70,
    borderRightWidth: width * 2,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 2,
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
    top: 90,
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
});
