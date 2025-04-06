import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function InscripcionesDuenoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Icon name="trophy" type="font-awesome" color="#FDBA12" size={18} style={{ marginRight: 8 }} />
          <Text style={styles.headerText}>Inscripciones</Text>
        </View>

        {/* Franjas superiores */}
        <View style={styles.triangleTopRed} />
        <View style={[styles.franja, styles.franjaNegraTop]} />
        <View style={[styles.franja, styles.franjaGrisTop]} />

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar torneos..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity style={styles.btnBuscar}>
            <Text style={styles.btnBuscarTexto}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Torneos inscritos */}
        <Text style={styles.subtitulo}>Torneos inscritos</Text>
        <View style={styles.cardInscrito}>
          <Image source={require('../../../assets/madrid.png')} style={styles.logo} />
          <View>
            <Text style={styles.cardTitle}>Torneo Infantil</Text>
            <Text style={styles.estadoProceso}>Pago en PROCESO</Text>
            <Text style={styles.cardText}>05/03/2025 · 10 clubes</Text>
          </View>
        </View>

        {/* Torneos disponibles */}
        <Text style={styles.subtituloDisponible}>Torneos Disponibles</Text>

        {[ // Esto puedes mapearlo si es dinámico
          { nombre: 'Torneo Rápido', img: require('../../../assets/barcelona.png') },
          { nombre: 'Torneo Veteranos', img: require('../../../assets/barcelona.png') },
          { nombre: 'Campeones', img: require('../../../assets/paris.png') },
        ].map((torneo, index) => (
          <View key={index} style={styles.cardDisponible}>
            <Image source={torneo.img} style={styles.logo} />
            <View>
              <Text style={styles.cardTitle}>{torneo.nombre}</Text>
              <Text style={styles.estadoActivo}>ACTIVO</Text>
              <Text style={styles.cardText}>05/03/2025 · 10 clubes</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 40,
    zIndex: 1,
  },
  franjaNegraTop: {
    top: 60,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#000',
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnBuscarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0e1b39',
    marginBottom: 6,
  },
  subtituloDisponible: {
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#0e1b39',
    color: '#FDBA12',
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
    marginBottom: 6,
    textAlign: 'center',
  },
  cardInscrito: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardDisponible: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardText: {
    color: '#ccc',
    fontSize: 12,
  },
  estadoProceso: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
  },
  estadoActivo: {
    color: 'lime',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
