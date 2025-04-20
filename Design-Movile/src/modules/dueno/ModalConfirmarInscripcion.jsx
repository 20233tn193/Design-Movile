import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ModalConfirmarInscripcion({
  visible,
  onClose,
  onConfirm,
  torneo,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Confirmar Inscripción</Text>
          <Text style={styles.texto}>
            ¿Deseas inscribirte al torneo <Text style={styles.destacado}>{torneo}</Text>?
          </Text>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onClose}>
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonConfirmar} onPress={onConfirm}>
              <Text style={styles.textoBoton}>Confirmar</Text>
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
  modal: {
    backgroundColor: '#fff',
    width: width * 0.85,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 10,
    textAlign: 'center',
  },
  texto: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  destacado: {
    fontWeight: 'bold',
    color: '#d80027',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botonCancelar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonConfirmar: {
    backgroundColor: '#d80027',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});