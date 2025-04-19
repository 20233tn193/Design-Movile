import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import API from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas'; // Ajusta la ruta según tu estructura

const { width } = Dimensions.get('window');

export default function TablaPosiciones({ route }) {
  const { torneoId } = route.params;
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    console.log('📦 ID del torneo recibido:', torneoId);
    const cargarTabla = async () => {
      try {
        const response = await API.get(`/estadisticas/tabla-posiciones/${torneoId}`);
        setTabla(response.data);
      } catch (error) {
        console.log('Error al obtener tabla de posiciones:', error);
      }
    };

    if (torneoId) {
      cargarTabla();
    }
  }, [torneoId]);

  return (
    <View style={styles.container}>
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />
      <FranjasDecorativas />

      <View style={styles.header}>
        <Text style={styles.headerText}> Tabla de Posiciones</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Equipo</Text>
        <Text style={styles.columnHeader}>PJ</Text>
        <Text style={styles.columnHeader}>PG</Text>
        <Text style={styles.columnHeader}>PP</Text>
        <Text style={styles.columnHeader}>GF</Text>
        <Text style={styles.columnHeader}>GC</Text>
        <Text style={styles.columnHeader}>Pts</Text>
      </View>

      <FlatList
        data={tabla}
        keyExtractor={(item, index) => `${item.nombreEquipo}_${index}`}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.column, styles.equipoText, { flex: 2 }]}>{item.nombreEquipo}</Text>
            <Text style={styles.column}>{item.partidosJugados}</Text>
            <Text style={styles.column}>{item.ganados}</Text>
            <Text style={styles.column}>{item.perdidos}</Text>
            <Text style={styles.column}>{item.golesFavor}</Text>
            <Text style={styles.column}>{item.golesContra}</Text>
            <Text style={styles.column}>{item.puntos}</Text>
          </View>
        )}
      />

      {tabla.length === 0 && (
        <Text style={styles.emptyText}>
          No hay datos disponibles para este torneo.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    paddingTop: 30,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1f2d5a',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
    justifyContent: 'space-between'
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  equipoText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  column: {
    textAlign: 'center',
    fontSize: 12,
    flex: 1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 50,
    zIndex: -1,
  },
  franjaGrisTop: {
    top: 120,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 90,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaRojaTop: {
    top: 60,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisBottom: {
    bottom: 70,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '10deg' }],
  },
  franjaNegraBottom: {
    bottom: 35,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '10deg' }],
  },
  franjaRojaBottom: {
    bottom: 0,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: 'gray',
    fontSize: 14,
  },
});
