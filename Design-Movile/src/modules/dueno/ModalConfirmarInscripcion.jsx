import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ModalConfirmarPago from './ModalConfirmarPago';

const { width } = Dimensions.get('window');

export default function ModalConfirmarInscripcion({ visible, onClose, torneo, navigation }) {
  const [modalPagoVisible, setModalPagoVisible] = useState(false);

  const handleConfirmPago = () => {
    setModalPagoVisible(false);
    onClose(); // Cierra modal de inscripción
    if (navigation && navigation.navigate) {
      navigation.navigate('PagoStripe'); // ✅ Redirige si está definido
    } else {
      console.warn('navigation está indefinido');
    }
  };

  return (
    <>
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.titulo}>Confirmar Inscripción</Text>
            <Text style={styles.pregunta}>
              ¿<Text style={{ color: '#d80027', fontWeight: 'bold' }}>Inscribirse</Text> a {'\n'}
              <Text style={styles.nombreTorneo}>"{torneo}"</Text>?
            </Text>

            <View style={styles.botonesContainer}>
              <TouchableOpacity
                onPress={() => setModalPagoVisible(true)}
                style={styles.btnRojo}
              >
                <Text style={styles.textoBoton}>PAGAR INSCRIPCIÓN</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnGris} onPress={onClose}>
                <Text style={styles.textoBoton}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Segundo Modal */}
      <ModalConfirmarPago
        visible={modalPagoVisible}
        onClose={() => setModalPagoVisible(false)}
        onConfirm={handleConfirmPago}
      />
    </>
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
    padding: 10,
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 15,
  },
  pregunta: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  nombreTorneo: {
    color: '#d80027',
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnRojo: {
    backgroundColor: '#d80027',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnGris: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
