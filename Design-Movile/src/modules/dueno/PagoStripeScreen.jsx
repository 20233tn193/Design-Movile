import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import ModalInformacionCredenciales from './ModalInformacionCredenciales';

const { width } = Dimensions.get('window');

export default function PagoStripeScreen({ navigation }) {
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  const handlePago = () => {
    // Simulación de pago exitoso
    navigation.navigate('PagosDueno', { mostrarModalComprobacion: true });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../assets/madrid.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Torneo Infantil - Arbitraje</Text>
      <Text style={styles.monto}>$50</Text>

      {/* Botones de método de pago */}
      <TouchableOpacity style={styles.btnApple}>
        <Text style={styles.btnAppleText}> Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLink}>
        <Text style={styles.btnLinkText}>Pay with 🟢 link</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>O paga con otra opción</Text>

      {/* Campos del formulario */}
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Card number" style={styles.input} keyboardType="numeric" />

      <View style={styles.cardRow}>
        <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1 }]} />
        <TextInput placeholder="CVC" style={[styles.input, { flex: 1 }]} />
      </View>

      <TextInput placeholder="País o región" style={styles.input} />
      <TextInput placeholder="Código postal" style={styles.input} />

      {/* Botón de pago */}
      <TouchableOpacity style={styles.btnPagar} onPress={handlePago}>
        <Text style={styles.btnPagarText}>Pagar $50</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <ModalInformacionCredenciales
  visible={modalInfoVisible}
  onClose={() => {
    setModalInfoVisible(false);
    navigation.navigate('PagosDueno', { mostrarModalComprobacion: true });
  }}
/>
 </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  monto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 20,
  },
  btnApple: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnAppleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnLink: {
    backgroundColor: '#00c853',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnLinkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    color: '#999',
    fontSize: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  btnPagar: {
    marginTop: 20,
    backgroundColor: '#0e1b39',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  btnPagarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
