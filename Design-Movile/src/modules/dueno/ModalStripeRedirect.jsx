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

export default function ModalStripeRedirect({ visible, onClose, navigation, nombreEquipo }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Referencia de pago</Text>

          <Text style={styles.texto}>
            Para realizar el pago, utiliza la siguiente información:
          </Text>

          <View style={styles.datoContainer}>
            <Text style={styles.label}>Banco:</Text>
            <Text style={styles.valor}>BBVA</Text>
          </View>

          <View style={styles.datoContainer}>
            <Text style={styles.label}>Número de cuenta:</Text>
            <Text style={styles.valor}>0123 4567 8910 1121</Text>
          </View>

          <View style={styles.datoContainer}>
            <Text style={styles.label}>Titular:</Text>
            <Text style={styles.valor}>Yasmin</Text>
          </View>

          <View style={styles.concepto}>
            <Text style={styles.label}>Concepto:</Text>
            <Text style={styles.valor}>
              {nombreEquipo} 
            </Text>
            <Text style={styles.ejemplo}>Ejemplo: {nombreEquipo || 'Barcelona'} Partido 1</Text>
            
          </View>

          <View style={styles.montos}>
            <Text style={styles.monto}>Arbitraje: $100</Text>
            <Text style={styles.monto}>Cancha: $50</Text>
          </View>

          <View style={styles.botonesContainer}>
            <TouchableOpacity
              style={styles.btnAceptar}
              onPress={() => {
                onClose();
              }}
            >
              <Text style={styles.textoBoton}>ACEPTAR</Text>
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
    width: width * 0.85,
    borderRadius: 12,
    padding: 20,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FDBA12',
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: 16,
  },
  texto: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  datoContainer: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  valor: {
    color: '#444',
    fontSize: 16,
  },
  concepto: {
    marginTop: 12,
    marginBottom: 16,
  },
  ejemplo: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  montos: {
    marginBottom: 20,
  },
  monto: {
    fontSize: 14,
    color: '#0e1b39',
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    gap: 10,
  },
  btnAceptar: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#555',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});