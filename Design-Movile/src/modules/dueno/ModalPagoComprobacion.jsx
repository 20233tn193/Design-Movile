import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ModalPagoComprobacion({ visible, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Información</Text>
          <Text style={styles.mensaje}>
            <Text style={{ fontWeight: 'bold' }}>Su pago será comprobado por el Administrador</Text>
          </Text>

          <TouchableOpacity style={styles.botonAceptar} onPress={onClose}>
            <Text style={styles.textoBoton}>ACEPTAR</Text>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 15,
  },
  mensaje: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  botonAceptar: {
    backgroundColor: '#0e1b39',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});