import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function RegistroCerrado({ route }) {
  const { asistencias, goles, rojas, amarillas, jugadores } = route.params;

  const renderSeccion = (titulo, icono, color, valores) => (
    <View style={styles.seccionContainer}>
      <View style={styles.seccionHeader}>
        <Icon name={icono} type="font-awesome" color={color} size={20} style={{ marginRight: 8 }} />
        <Text style={styles.seccionTitle}>{titulo}</Text>
      </View>
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemNombre}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.itemValor}>{
              titulo === 'Asistencias' ? (asistencias[index] ? '✅' : '❌') : valores[index]
            }</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      <View style={styles.header}>
        <Icon name="check-circle" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro Cerrado</Text>
      </View>

      {renderSeccion('Asistencias', 'check-circle', 'green', asistencias)}
      {renderSeccion('Goles', 'futbol-o', '#000', goles)}
      {renderSeccion('Tarjetas Rojas', 'square', 'red', rojas)}
      {renderSeccion('Tarjetas Amarillas', 'square', 'gold', amarillas)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', paddingTop: 0
  },
  header: {
    backgroundColor: '#000', padding: 12, paddingTop: 30,
    flexDirection: 'row', alignItems: 'center'
  },
  headerText: {
    color: '#FDBA12', fontSize: 18, fontWeight: 'bold'
  },
  seccionContainer: {
    marginVertical: 10, paddingHorizontal: 15
  },
  seccionHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8
  },
  seccionTitle: {
    fontSize: 16, fontWeight: 'bold', color: '#0e1b39'
  },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee'
  },
  itemNombre: {
    fontSize: 14, color: '#333'
  },
  itemValor: {
    fontSize: 14, fontWeight: 'bold', color: '#000'
  },
  triangleTopRed: {
    position: 'absolute', top: 10, left: 0, width: 0, height: 0,
    borderTopWidth: 70, borderRightWidth: width * 2,
    borderTopColor: '#d80027', borderRightColor: 'transparent', zIndex: -1
  },
  franja: {
    position: 'absolute', width: width * 2, height: 40, zIndex: -2
  },
  franjaNegraTop: {
    top: 80, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }]
  },
  franjaGrisTop: {
    top: 90, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }]
  },
});