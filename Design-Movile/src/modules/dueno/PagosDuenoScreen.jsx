import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import ModalStripeRedirect from './ModalStripeRedirect'; // asegúrate que esté bien importado

const { width } = Dimensions.get('window');

export default function PagosDuenoScreen({ navigation }) {
  const [modalStripeVisible, setModalStripeVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="dollar" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Pagos</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.franjaRoja} />
      <View style={styles.franjaNegra} />
      <View style={styles.franjaGris} />

      {/* Tarjeta de torneo */}
      <View style={styles.torneoCard}>
        <Image source={require('../../../assets/Madrid.jpg')} style={styles.logo} />
        <View style={styles.torneoInfo}>
          <Text style={styles.nombreTorneo}>Torneo Infantil</Text>
          <Text style={styles.estado}>CERRADO</Text>
          <Text style={styles.subtexto}>05/03/2025   10 clubs</Text>
        </View>
        <TouchableOpacity style={styles.btnPago}>
          <Icon name="dollar" type="font-awesome" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabla de pagos */}
      <View style={styles.encabezadoTabla}>
        <Text style={styles.th}>Nombre</Text>
        <Text style={styles.th}># Partido</Text>
        <Text style={styles.th}>Monto</Text>
        <Text style={styles.th}>Estatus</Text>
      </View>

      <ScrollView style={styles.tabla}>
        {[
          ['Arbitraje', '1', '$100', 'Pagado'],
          ['Cancha', '1', '$50', 'Pagado'],
          ['Arbitraje', '2', '$100', 'Pagado'],
          ['Cancha', '2', '$50', 'Pagado'],
          ['Arbitraje', '3', '$100', 'Pendiente'],
          ['Cancha', '3', '$50', 'Pendiente'],
        ].map(([nombre, partido, monto, estatus], i) => (
          <View key={i} style={styles.fila}>
            <Text style={styles.td}>{nombre}</Text>
            <Text style={styles.td}>{partido}</Text>
            <Text style={styles.td}>{monto}</Text>
            <Text style={[styles.td, { color: estatus === 'Pendiente' ? 'red' : 'green' }]}>
              {estatus}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnAccion} onPress={() => setModalStripeVisible(true)}>
          <Text style={styles.btnTexto}>Pagar arbitraje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion} onPress={() => setModalStripeVisible(true)}>
          <Text style={styles.btnTexto}>Pagar cancha</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Stripe */}
      <ModalStripeRedirect
        visible={modalStripeVisible}
        onClose={() => setModalStripeVisible(false)}
        onConfirm={() => {
          setModalStripeVisible(false);
          navigation.navigate('PagoStripe'); // redirige a la pantalla de Stripe
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    width: '100%',
    padding: 12,
    position: 'absolute',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
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
  torneoCard: {
    flexDirection: 'row',
    backgroundColor: '#0e1b39',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  torneoInfo: {
    flex: 1,
  },
  nombreTorneo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  estado: {
    color: 'orange',
    fontWeight: 'bold',
  },
  subtexto: {
    color: '#fff',
    fontSize: 12,
  },
  btnPago: {
    backgroundColor: '#d80027',
    padding: 10,
    borderRadius: 10,
  },
  encabezadoTabla: {
    flexDirection: 'row',
    backgroundColor: '#0e1b39',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  th: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  tabla: {
    marginVertical: 10,
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  td: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  btnAccion: {
    flex: 1,
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
});