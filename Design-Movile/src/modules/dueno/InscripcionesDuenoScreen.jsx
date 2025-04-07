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
  const torneosDisponibles = [
    { nombre: 'Torneo Infantil', img: require('../../../assets/madrid.png') },
    { nombre: 'Torneo Veteranos', img: require('../../../assets/barcelona.png') },
    { nombre: 'Campeones', img: require('../../../assets/paris.png') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={18} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Inscripciones</Text>
      </View>

      {/* Franjas decorativas superiores */}
      <View style={styles.decorativas}>
        <View style={styles.triangleTopRed} />
        <View style={[styles.franja, styles.franjaNegraTop]} />
        <View style={[styles.franja, styles.franjaGrisTop]} />
      </View>

      {/* Contenido */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Buscador y torneos inscritos */}
        <View style={styles.buscadorYInscritos}>
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

          <View style={styles.cardInscritoBox}>
            <Text style={styles.cardInscritoTitulo}>Torneos inscritos</Text>
            <Text style={styles.cardInscritoTexto}>
              Aquí aparecerán los torneos a los que estás inscrito
            </Text>
          </View>
        </View>

        {/* Torneos disponibles */}
        <Text style={styles.subtituloDisponible}>Torneos Disponibles</Text>

        {torneosDisponibles.map((torneo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardDisponible}
            onPress={() => navigation.navigate('DetalleTorneoDueno', {
              nombre: torneo.nombre,
              imagen: torneo.img
            })}
          >
            <Image source={torneo.img} style={styles.logo} />
            <View>
              <Text style={styles.cardTitle}>{torneo.nombre}</Text>
              <Text style={styles.estadoActivo}>ACTIVO</Text>
              <Text style={styles.cardText}>05/03/2025   · 10 clubs</Text>
            </View>
          </TouchableOpacity>
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
  header: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  decorativas: {
    height: 130,
    marginBottom: 10,
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
  scroll: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnBuscarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtituloDisponible: {
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: '#0e1b39',
    color: '#FDBA12',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
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
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
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
  estadoActivo: {
    color: 'lime',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardInscritoBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: -10,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardInscritoTitulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0e1b39',
    marginBottom: 4,
  },
  cardInscritoTexto: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
});
