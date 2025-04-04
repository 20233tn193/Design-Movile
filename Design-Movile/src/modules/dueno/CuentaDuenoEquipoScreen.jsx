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

export default function CuentaDuenoEquipoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Cuenta</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.franjaRoja} />
      <View style={styles.franjaNegra} />
      <View style={styles.franjaGris} />

      {/* Card de equipo */}
      <View style={styles.card}>
        <View style={styles.equipoContainer}>
          <Image
            source={{ uri: 'https://placehold.co/60x60?text=ESC' }}
            style={styles.logoEquipo}
          />
          <View style={styles.etiquetaEquipo}>
            <Text style={styles.textoEtiqueta}>Barcelona</Text>
            <TouchableOpacity style={styles.btnEditarEscudo}>
              <Icon name="pencil" type="font-awesome" color="#fff" size={12} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.nombre}>Juan Chavez</Text>
        <Text style={styles.info}>20233tn152@utez.edu.mx</Text>
        <Text style={styles.info}>7772074581</Text>

        <TouchableOpacity style={styles.btnEditarDatos}>
          <Icon name="pencil" type="font-awesome" color="#000" size={14} />
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <TouchableOpacity
        style={styles.btnPrimario}
        onPress={() => navigation.navigate('InscripcionesDueno')}
      >
        <Text style={styles.btnTexto}>Torneos Inscritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecundario}>
        <Text style={styles.btnTexto}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Logo inferior */}
      <Image
        source={require('../../../assets/manhattan_logo.jpg')}
        style={styles.logoManhattan}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 120,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    width: '100%',
    padding: 12,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
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
    marginBottom: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  equipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoEquipo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  etiquetaEquipo: {
    backgroundColor: '#0e1b39',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoEtiqueta: {
    color: '#FDBA12',
    fontWeight: 'bold',
    marginRight: 6,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: '#333',
  },
  btnEditarDatos: {
    position: 'absolute',
    top: 85,
    right: 12,
    backgroundColor: '#f1f1f1',
    padding: 6,
    borderRadius: 20,
  },
  btnEditarEscudo: {
    marginLeft: 6,
  },
  btnPrimario: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  btnSecundario: {
    backgroundColor: '#d80027',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoManhattan: {
    width: 160,
    height: 40,
    marginTop: 10,
  },
});
