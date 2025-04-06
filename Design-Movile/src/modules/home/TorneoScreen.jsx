import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CardListTorneos from '../../kernel/components/CardListTorneos';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const torneos = [
  {
    logo: require('../../../assets/TorneoABC.jpg'),
    nombre: 'Torneo ABC',
    estado: 'ACTIVO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/TorneoEstatal.jpg'),
    nombre: 'Torneo Estatal',
    estado: 'FINALIZADO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/madrid.png'),
    nombre: 'Torneo Infantil',
    estado: 'ACTIVO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/barcelona.png'),
    nombre: 'Torneo Veteranos',
    estado: 'FINALIZADO',
    fecha: '05/03/2025',
    clubes: 10,
  },
];

export default function TorneoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.headerFull}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={22} />
        <Text style={styles.title}> Torneos</Text>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <TextInput placeholder="Buscar" placeholderTextColor="#666" style={styles.input} />
        </View>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Buscar</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {torneos.map((torneo, i) => (
          <View key={i} style={styles.cardTorneo}>
            <CardListTorneos {...torneo} navigation={navigation} />
          </View>
        ))}
      </ScrollView>
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
  headerFull: {
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
    marginLeft: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#d80027',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTorneo: {
    backgroundColor: '#0e1b39',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 14,
    padding: 10,
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
