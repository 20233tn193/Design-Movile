import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import ModalConfirmarInscripcion from './ModalConfirmarInscripcion';
import ModalStripeRedirect from './ModalStripeRedirect';

const { width } = Dimensions.get('window');

export default function DetalleTorneoDuenoScreen({ navigation, route }) {
  const [modalInscripcionVisible, setModalInscripcionVisible] = useState(false);
  const [modalStripeVisible, setModalStripeVisible] = useState(false);

  const { nombre, imagen } = route.params || {
    nombre: 'Torneo Infantil',
    imagen: require('../../../assets/madrid.png'),
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado limpio */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Detalles del Torneo</Text>
      </View>

      {/* Tarjeta del torneo */}
      <View style={styles.card}>
        <Image source={imagen} style={styles.logo} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{nombre}</Text>
          <Text style={styles.estado}>ACTIVO</Text>
          <Text style={styles.cardText}>Inicio: 05/03/2025</Text>
          <Text style={styles.cardText}>10 equipos</Text>
          <Text style={styles.cardText}>Espacios disponibles: 3</Text>
          <Text style={styles.cardText}>Inscripción: $900</Text>
        </View>
      </View>

      {/* Información adicional */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Información del Torneo</Text>
        <Text style={styles.infoText}>Clasificación por doble eliminación</Text>

        <Text style={styles.infoTitle}>Requisitos</Text>
        <Text style={styles.infoText}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit duis, porta mattis odio ligula
          pulvinar habitasse variu
        </Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.btnGreen}
          onPress={() => setModalInscripcionVisible(true)}
        >
          <Text style={styles.btnText}>Inscribirse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnGray}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* MODALES */}
      <ModalConfirmarInscripcion
        visible={modalInscripcionVisible}
        onClose={() => setModalInscripcionVisible(false)}
        onConfirm={() => {
          setModalInscripcionVisible(false);
          setModalStripeVisible(true);
        }}
        torneo={nombre}
        navigation={navigation}
      />

      <ModalStripeRedirect
        visible={modalStripeVisible}
        onClose={() => setModalStripeVisible(false)}
        navigation={navigation} // ✅ navegación pasada correctamente
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 80 : 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0e1b39',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  estado: {
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 2,
  },
  cardText: {
    color: '#fff',
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  btnGreen: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnGray: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
