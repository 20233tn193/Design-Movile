import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api'; // Ajusta si es necesario

const { width } = Dimensions.get('window');

export default function GoleadoresScreen({ route }) {
  const { torneoId } = route.params;
  const [goleadores, setGoleadores] = useState([]);

  useEffect(() => {
    const cargarGoleadores = async () => {
      try {
        const response = await API.get(`/estadisticas/goleadores/${torneoId}`);
        const data = response.data.map((item) => ({
          nombreJugador: `${item.nombre} ${item.apellido}`,
          nombreEquipo: item.equipoNombre || 'Sin equipo',
          logoEquipo: item.equipoEscudo || 'https://via.placeholder.com/40',
          goles: item.goles,
        }));
        setGoleadores(data);
      } catch (error) {
        console.log('Error al obtener goleadores:', error);
      }
    };

    cargarGoleadores();
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
        <Image source={require('../../../assets/Goleadores.png')} style={styles.icono} />
        <Text style={styles.title}> Goleadores</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Nombre</Text>
        <Text style={styles.columnHeader}>Equipo</Text>
        <Text style={styles.columnHeader}>Goles</Text>
      </View>

      <FlatList
        data={goleadores}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.nombre} {item.apellido}</Text>
            <View style={styles.equipo}>
              <Image
                source={{ uri: item.logoEquipo || 'https://via.placeholder.com/40' }}
                style={styles.logo}
              />
            </View>
            <Text style={styles.column}>{item.goles}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
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
    paddingVertical: 10,
    backgroundColor: '#1f2d5a',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 13,
    width: 90,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  column: {
    fontSize: 12,
    width: 90,
    textAlign: 'center',
  },
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ddd',
  },
  icono: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
});