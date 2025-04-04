import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ModalInformacionCredenciales({ visible, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Información</Text>
          <Text style={styles.mensaje}>
            Una vez que su pago haya sido{' '}
            <Text style={styles.aprobado}>APROBADO</Text>: podrá registrar a sus
            jugadores al torneo
          </Text>
          <TouchableOpacity style={styles.btnAceptar} onPress={onClose}>
            <Text style={styles.btnTexto}>ACEPTAR</Text>
          </TouchableOpacity>
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
    paddingBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1a1a1a',
    color: '#FDBA12',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    padding: 12,
    fontSize: 16,
  },
  mensaje: {
    padding: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  aprobado: {
    color: 'lime',
    fontWeight: 'bold',
  },
  btnAceptar: {
    backgroundColor: '#0e1b39',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
