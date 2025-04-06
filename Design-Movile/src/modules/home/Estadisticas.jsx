import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function Estadisticas({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="bar-chart" type="font-awesome" color="#FDBA12" size={22} />
        <Text style={styles.title}> Estadísticas</Text>
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Torneos Activos:</Text>
          <Text style={styles.value}>3</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Equipos Registrados:</Text>
          <Text style={styles.value}>28</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Partidos Jugados:</Text>
          <Text style={styles.value}>15</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Goles Totales:</Text>
          <Text style={styles.value}>54</Text>
        </View>
      </ScrollView>

      {/* Barra personalizada */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => navigation.replace('BottomTabs')}>
          <Icon name="trophy" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('CuentaArbitro')}>
          <Icon name="user" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Estadisticas')}>
          <Icon name="bar-chart" type="font-awesome" color="#FDBA12" size={24} />
        </TouchableOpacity>
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
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop: 30,
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  content: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#101e3d',
    borderRadius: 14,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    color: '#FDBA12',
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
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
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#1a1a1a',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
});
