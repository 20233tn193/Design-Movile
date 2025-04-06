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

export default function ModalConfirmarDescargaCredenciales({ visible, onClose, onConfirm }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Confirmar</Text>
          <Text style={styles.pregunta}>
            ¿<Text style={{ fontWeight: 'bold' }}>Deseas Generar y{'\n'}Descargar Credenciales</Text>?
          </Text>

          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.btnVerde} onPress={onConfirm}>
              <Text style={styles.textoBoton}>DESCARGAR</Text>
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
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnVerde: {
    backgroundColor: 'green',
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