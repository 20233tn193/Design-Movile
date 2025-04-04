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

export default function ModalConfirmarEliminacion({ visible, onClose, onEliminar }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerModal}>
            <Text style={styles.headerText}>Confirmar Eliminación</Text>
          </View>

          <View style={styles.contentModal}>
            <Text style={styles.pregunta}> <Text style={{ color: 'red', fontWeight: 'bold' }}>¿Eliminar Equipo?</Text></Text>
            <Text style={styles.descripcion}>Esta acción no se puede deshacer</Text>

            <View style={styles.botonesRow}>
              <TouchableOpacity style={styles.btnEliminar} onPress={onEliminar}>
                <Text style={styles.textoBoton}>ELIMINAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
                <Text style={styles.textoBoton}>CANCELAR</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
  },
  headerModal: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  contentModal: {
    padding: 20,
    alignItems: 'center',
  },
  pregunta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 13,
    color: '#555',
    marginBottom: 16,
  },
  botonesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnEliminar: {
    backgroundColor: '#d80027',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  btnCancelar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
