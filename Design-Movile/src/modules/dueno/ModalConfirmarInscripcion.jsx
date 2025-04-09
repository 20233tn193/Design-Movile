import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import API from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalConfirmarInscripcion({ visible, onClose, onConfirm, torneo, torneoId, navigation }) {
  const handleInscribirse = async () => {
    try {
      const duenoId = await AsyncStorage.getItem('duenoId');
      const res = await API.get(`/equipos/dueño/${duenoId}`);
      const equipo = res.data[0];

      if (!equipo || !equipo.id) {
        Alert.alert('Error', 'No se encontró el equipo del dueño.');
        return;
      }

      await API.post('/equipos/inscribirse', {
        equipoId: equipo.id,
        torneoId,
      });

      Alert.alert('¡Inscripción exitosa!', `Te has inscrito al torneo ${torneo}`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('❌ Error al inscribirse:', error);
      Alert.alert('Error', 'No se pudo realizar la inscripción.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>¿Confirmar inscripción?</Text>
          <Text style={styles.text}>¿Deseas inscribirte al torneo "{torneo}"?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInscribirse} style={styles.confirm}>
              <Text style={styles.btnText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
  modal: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 20 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancel: { backgroundColor: '#aaa', padding: 10, borderRadius: 6 },
  confirm: { backgroundColor: 'green', padding: 10, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});