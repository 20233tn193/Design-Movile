import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👉 IMPORTANTE

const { width } = Dimensions.get('window');

export default function ModalPagoComprobacion({ visible, onClose }) {
  const navigation = useNavigation(); // 👉 obtener navegación aquí

  const handleAceptar = () => {
    onClose();
    navigation.navigate('InscripcionAprobado'); // 👉 redirige correctamente
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Información</Text>
          <Text style={styles.mensaje}>
            <Text style={{ fontWeight: 'bold' }}>
              Una vez que su pago haya sido <Text style={{ color: 'limegreen', fontWeight: 'bold' }}>APROBADO</Text>, podrá registrar a sus jugadores al torneo.
            </Text>
          </Text>

          <TouchableOpacity style={styles.botonAceptar} onPress={handleAceptar}>
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
