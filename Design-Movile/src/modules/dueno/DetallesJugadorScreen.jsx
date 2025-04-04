import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function DetallesJugadorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Detalles Jugador</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.franjaRoja} />
      <View style={styles.franjaNegra} />
      <View style={styles.franjaGris} />

      {/* Card del Jugador */}
      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Image
            source={{ uri: 'https://placehold.co/60x60.png?text=Foto' }}
            style={styles.foto}
          />
          <View style={styles.etiqueta}>
            <Text style={styles.etiquetaTexto}>Jugador</Text>
          </View>
        </View>

        <Text style={styles.nombre}><Text style={{ fontWeight: 'bold' }}>Hanna Perez</Text></Text>
        <Text style={styles.dato}>ROVL991001HMSJRS02</Text>
        <Text style={styles.dato}>26/01/2004</Text>

        <TouchableOpacity style={styles.btnEditar}>
          <Icon name="pencil" type="font-awesome" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnEliminar}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegresar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTexto}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Manhattan */}
      <Image
        source={require('../../../assets/logo_manhattan.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
  },
  franjaRoja: {
    position: 'absolute',
    top: 50,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegra: {
    position: 'absolute',
    top: 75,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGris: {
    position: 'absolute',
    top: 100,
    left: -width,
    width: width * 2,
    height: 40,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginTop: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  etiqueta: {
    backgroundColor: '#0e1b39',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  etiquetaTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  nombre: {
    marginTop: 12,
    fontSize: 16,
  },
  dato: {
    fontSize: 14,
    color: '#333',
  },
  btnEditar: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 8,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 20,
  },
  btnEliminar: {
    flex: 1,
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnRegresar: {
    flex: 1,
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 160,
    height: 40,
    marginTop: 30,
  },
});
