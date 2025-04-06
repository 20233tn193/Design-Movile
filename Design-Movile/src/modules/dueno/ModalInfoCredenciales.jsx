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

export default function ModalInformacionCredenciales({ visible, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Información</Text>
          <Text style={styles.mensaje}>
            Sólo se pueden generar{'\n'}credenciales cuando el torneo esté{' '}
            <Text style={styles.estado}>CERRADO</Text>
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
    borderRadius: 10,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  titulo: {
    backgroundColor: '#1a1a1a',
    color: '#FDBA12',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
  mensaje: {
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  estado: {
    color: '#d80027',
    fontWeight: 'bold',
  },
  btnAceptar: {
    backgroundColor: '#0e1b39',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});