import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api'; // ajusta si tu ruta es distinta
const { width } = Dimensions.get('window');

export default function TarjetasScreen({ route }) {
  const { torneoId } = route.params;
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await API.get(`/estadisticas/tarjetas/${torneoId}`);
        setTarjetas(response.data);
      } catch (error) {
        console.log('Error al cargar tarjetas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTarjetas();
  }, [torneoId]);

  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.header}>
        <Icon name="credit-card" type="font-awesome-5" color="#FDBA12" size={20} />
        <Text style={styles.title}> Tarjetas</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { width: 120 }]}>Nombre</Text>
        <Text style={[styles.columnHeader, { width: 80 }]}>Equipo</Text>
        <View style={styles.cardIcons}>
          <Icon name="square" type="font-awesome" color="#FDBA12" size={16} />
          <Icon name="square" type="font-awesome" color="red" style={{ marginLeft: 8 }} size={16} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color="#d80027" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={tarjetas}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.text, { width: 120 }]}>{item.jugadorId || 'Sin nombre'}</Text>
              <Text style={[styles.text, { width: 80 }]}>{item.torneoId}</Text>
              <Text style={styles.text}>{item.amarillas}</Text>
              <Text style={styles.text}>{item.rojas}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 10,
    paddingTop: 30,
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2d5a',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 6,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    marginRight: 20,
    color: '#333',
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
});
