import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function InscripcionAprobadoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Inscripciones</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar torneo..."
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Torneos inscritos */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Torneos inscritos</Text>

          <View style={styles.card}>
            <Image source={require('../../../assets/madrid.png')} style={styles.logo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloTorneo}>Torneo Infantil</Text>
              <Text style={{ color: 'limegreen', fontWeight: 'bold' }}>Pago APROBADO</Text>
              <Text style={styles.fecha}>05/03/2025    10 clubs</Text>
            </View>
            {/* 👉 Ícono presionable con navegación */}
            <TouchableOpacity
              onPress={() => navigation.navigate('JugadoresRegistradosDueno')}
              style={{ padding: 5 }}
            >
              <Icon name="user-plus" type="font-awesome" color="white" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Torneos disponibles */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Torneos Disponibles</Text>

          {[
            { nombre: 'Torneo Rápido', imagen: require('../../../assets/paris.png') },
            { nombre: 'Torneo Veteranos', imagen: require('../../../assets/barcelona.png') },
            { nombre: 'Campeones', imagen: require('../../../assets/madrid.png') },
          ].map((torneo, i) => (
            <View style={styles.card} key={i}>
              <Image source={torneo.imagen} style={styles.logo} />
              <View style={{ flex: 1 }}>
                <Text style={styles.tituloTorneo}>{torneo.nombre}</Text>
                <Text style={{ color: 'limegreen', fontWeight: 'bold' }}>ACTIVO</Text>
                <Text style={styles.fecha}>05/03/2025    10 clubs</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Franjas inferiores */}
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', position: 'relative' },
  header: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    color: '#000',
  },
  searchBtn: {
    backgroundColor: '#d80027',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  seccion: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  seccionTitulo: {
    backgroundColor: '#0e1b39',
    color: '#FDBA12',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1b39',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  tituloTorneo: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  estadoAprobado: { color: 'limegreen', fontWeight: 'bold', fontSize: 12 },
  estadoActivo: { color: '#00ffcc', fontWeight: 'bold', fontSize: 12 },
  fecha: { color: 'white', fontSize: 12 },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: -1,
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
});
