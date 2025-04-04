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

import ModalConfirmarInscripcion from './ModalConfirmarInscripcion';
import ModalStripeRedirect from './ModalStripeRedirect'; 

const { width } = Dimensions.get('window');

export default function DetalleTorneoDuenoScreen({ navigation }) {
  const [modalInscripcionVisible, setModalInscripcionVisible] = useState(false);
  const [modalStripeVisible, setModalStripeVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Detalles del Torneo</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Tarjeta de torneo */}
      <View style={styles.card}>
        <Image source={require('../../../assets/Madrid.jpg')} style={styles.logo} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Torneo Infantil</Text>
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
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btnInscribirse}
          onPress={() => setModalInscripcionVisible(true)}
        >
          <Text style={styles.btnTexto}>Inscribirse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnTexto}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* MODALES */}
      <ModalConfirmarInscripcion
        visible={modalInscripcionVisible}
        onClose={() => setModalInscripcionVisible(false)}
        onConfirm={() => {
          setModalInscripcionVisible(false);
          setModalStripeVisible(true); // abre segundo modal
        }}
        torneo="Torneo Infantil"
      />

      <ModalStripeRedirect
        visible={modalStripeVisible}
        onClose={() => setModalStripeVisible(false)}
        onConfirm={() => {
          setModalStripeVisible(false);
          navigation.navigate('PagoStripe'); // esta es la pantalla final con el pago real
        }}
      />
    </ScrollView>
  );
}
