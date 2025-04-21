import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalResumenResultados({ visible, jugadores, resultados, onConfirmar, onCancelar }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Resumen del Partido</Text>
          <FlatList
            data={jugadores}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const r = resultados[index];
              return (
                <View style={styles.item}>
                  <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
                  <Text>Asistencia: {r.asistio ? '✔️' : '❌'}</Text>
                  <Text>Goles: {r.goles}</Text>
                  <Text>Amarillas: {r.amarillas}</Text>
                  <Text>Rojas: {r.rojas}</Text>
                </View>
              );
            }}
          />
          <View style={styles.botones}>
            <TouchableOpacity style={styles.btnCancelar} onPress={onCancelar}>
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnConfirmar} onPress={onConfirmar}>
              <Text style={styles.textoBoton}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxHeight: '85%' },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 6 },
  nombre: { fontWeight: 'bold' },
  botones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnCancelar: { backgroundColor: '#ccc', padding: 10, borderRadius: 6 },
  btnConfirmar: { backgroundColor: '#28a745', padding: 10, borderRadius: 6 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
});