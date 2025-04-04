import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function ModalConfirmacion({ visible, onConfirmar, onCancelar }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Encabezado superior negro */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Confirmar Cierre</Text>
          </View>

          {/* Contenido del modal */}
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>¿Terminar Partido?</Text>
            <Text style={styles.texto}>Esta acción no se puede deshacer</Text>

            <View style={styles.botones}>
              <TouchableOpacity style={styles.btnCancelar} onPress={onCancelar}>
                <Text style={styles.textoCancelar}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnConfirmar} onPress={onConfirmar}>
                <Text style={styles.textoConfirmar}>TERMINAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: '#0e1b39',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#FDBA12',
  },
  modalHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d80027',
    marginBottom: 5,
  },
  texto: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnConfirmar: {
    flex: 1,
    backgroundColor: '#d80027',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
