import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ModalStripeRedirect({ visible, onClose, navigation }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Confirmar</Text>

          <Text style={styles.texto}>
            Será redirigido a <Text style={styles.bold}>Stripe</Text> para realizar su pago
          </Text>

          <View style={styles.botonesContainer}>
            <TouchableOpacity
              style={styles.btnVerde}
              onPress={() => {
                onClose(); // cerramos el modal
                navigation.navigate('PagoStripe'); // redirigimos correctamente
              }}
            >
              <Text style={styles.textoBoton}>ACEPTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnGris} onPress={onClose}>
              <Text style={styles.textoBoton}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: width * 0.8,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    backgroundColor: '#1a1a1a',
    color: '#FDBA12',
    fontWeight: 'bold',
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnVerde: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnGris: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
