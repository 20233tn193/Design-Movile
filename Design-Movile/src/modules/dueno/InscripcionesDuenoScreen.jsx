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
} from 'react-native';

const { width } = Dimensions.get('window');

export default function InscripcionesDuenoScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 <Text style={{ fontWeight: 'bold' }}>Inscripciones</Text></Text>
      </View>

      {/* Franjas superiores */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar..."
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
        <Image source={require('../../../assets/Madrid.jpg')} style={styles.logo} />
        <View>
          <Text style={styles.cardTitle}>Torneo Infantil</Text>
          <Text style={styles.estadoProceso}>Pago en PROCESO</Text>
          <Text style={styles.cardText}>05/03/2025   · 10 clubs</Text>
        </View>
      </View>

      {/* Torneos disponibles */}
      <Text style={styles.subtituloDisponible}>Torneos Disponibles</Text>

      {/* Tarjeta 1 */}
      <View style={styles.cardDisponible}>
        <Image source={require('../../../assets/Dortmund.jpg')} style={styles.logo} />
        <View>
          <Text style={styles.cardTitle}>Torneo Rápido</Text>
          <Text style={styles.estadoActivo}>ACTIVO</Text>
          <Text style={styles.cardText}>05/03/2025   · 10 clubs</Text>
        </View>
      </View>

      {/* Tarjeta 2 */}
      <View style={styles.cardDisponible}>
        <Image source={require('../../../assets/Barcelona.jpg')} style={styles.logo} />
        <View>
          <Text style={styles.cardTitle}>Torneo Veteranos</Text>
          <Text style={styles.estadoActivo}>ACTIVO</Text>
          <Text style={styles.cardText}>05/03/2025   · 10 clubs</Text>
        </View>
      </View>

      {/* Tarjeta 3 */}
      <View style={styles.cardDisponible}>
        <Image source={require('../../../assets/Paris.jpg')} style={styles.logo} />
        <View>
          <Text style={styles.cardTitle}>Campeones</Text>
          <Text style={styles.estadoActivo}>ACTIVO</Text>
          <Text style={styles.cardText}>05/03/2025   · 10 clubs</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 110,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 12,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 16,
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
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#000',
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnBuscarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 6,
  },
  subtituloDisponible: {
    fontWeight: 'bold',
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
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardDisponible: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardText: {
    color: '#fff',
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
