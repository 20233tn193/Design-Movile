import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';
import ModalConfirmarDescargaCredenciales from './ModalConfirmarDescargaCredenciales';

const { width } = Dimensions.get('window');

export default function JugadoresRegistradosDuenoScreen({ navigation }) {
  const [modalConfirmarVisible, setModalConfirmarVisible] = useState(false);

  const torneoCerrado = true;

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Jugadores Registrados</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Tarjeta del torneo */}
      <View style={styles.torneoCard}>
        <Image source={require('../../../assets/madrid.png')} style={styles.logo} />
        <View style={styles.torneoInfo}>
          <Text style={styles.nombreTorneo}>Torneo Infantil</Text>
          <Text style={styles.estadoCerrado}>CERRADO</Text>
          <Text style={styles.subtexto}>05/03/2025   10 clubs</Text>
        </View>
        <TouchableOpacity
          style={styles.btnPago}
          onPress={() => navigation.navigate('PagosDuenoScreen')}
        >
          <Icon name="dollar" type="font-awesome" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabla */}
      <View style={styles.encabezadoTabla}>
        <Text style={styles.th}>Nombre</Text>
        <Text style={styles.th}>Apellido</Text>
        <Text style={styles.thAcciones}>Acciones</Text>
      </View>

      <ScrollView style={styles.listaJugadores}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.fila}>
            <Text style={styles.td}>Hanna</Text>
            <Text style={styles.td}>Perez</Text>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => navigation.navigate('RegistroJugadorScreen')}>
                <Icon name="pencil" type="font-awesome" size={18} color="#d80027" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('DetallesJugadorScreen')}>
                <Icon name="id-card" type="font-awesome" size={18} color="#0e1b39" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity
          style={[
            styles.btnGenerar,
            { backgroundColor: torneoCerrado ? '#FDBA12' : '#ccc' },
          ]}
          onPress={() => setModalConfirmarVisible(true)}
        >
          <Text style={styles.btnTextoGenerar}>Generar Credenciales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnAgregar}
          onPress={() => navigation.navigate('RegistroJugadorDuenoScreen')}
        >
          <Text style={styles.btnTextoAgregar}>AGREGAR</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para confirmar descarga */}
      <ModalConfirmarDescargaCredenciales
        visible={modalConfirmarVisible}
        onClose={() => setModalConfirmarVisible(false)}
        onConfirm={() => {
          setModalConfirmarVisible(false);
          // lógica para generar/descargar credenciales
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
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
  triangleTopRed: {
    position: 'absolute',
    top: 60,
    left: -width,
    width: width * 2,
    height: 50,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
    zIndex: -1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: -2,
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
  torneoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1b39',
    borderRadius: 12,
    padding: 12,
    margin: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  torneoInfo: {
    flex: 1,
  },
  nombreTorneo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  estadoCerrado: {
    color: '#d80027',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subtexto: {
    color: 'white',
    fontSize: 12,
  },
  btnPago: {
    backgroundColor: '#d80027',
    borderRadius: 8,
    padding: 8,
  },
  encabezadoTabla: {
    flexDirection: 'row',
    backgroundColor: '#0e1b39',
    padding: 10,
    marginHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  th: {
    flex: 1,
    fontWeight: 'bold',
    color: '#FDBA12',
  },
  thAcciones: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FDBA12',
  },
  listaJugadores: {
    marginHorizontal: 15,
  },
  fila: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  td: {
    flex: 1,
    fontSize: 14,
  },
  acciones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  btnGenerar: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnAgregar: {
    flex: 1,
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextoGenerar: {
    color: '#000',
    fontWeight: 'bold',
  },
  btnTextoAgregar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
