import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function TarjetasScreen({ route }) {
  const { torneoId } = route.params;
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    console.log('📥 torneoId recibido en TarjetasScreen:', torneoId);
    const cargarTarjetas = async () => {
      try {
        const response = await API.get(`/estadisticas/tarjetas/${torneoId}`);
        console.log('📊 Tarjetas recibidas:', response.data);
        setTarjetas(response.data);
      } catch (error) {
        console.error('❌ Error al cargar tarjetas:', error);
      }
    };

    cargarTarjetas();
  }, [torneoId]);

  const renderHeader = () => (
    <View style={styles.headerTable}>
      <Text style={styles.headerText}>Nombre</Text>
      <Text style={styles.headerText}>Equipo</Text>
      <Text style={styles.headerText}>Amarillas</Text>
      <Text style={styles.headerText}>Rojas</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.jugador?.nombre || 'Sin nombre'}</Text>
      <Text style={styles.cell}>{item.equipo?.nombre || 'Sin equipo'}</Text>
      <Text style={styles.cell}>{item.amarillas}</Text>
      <Text style={styles.cell}>{item.rojas}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado visual */}
      <View style={styles.headerVisual}>
        <Icon name="id-badge" type="font-awesome" color="#FDBA12" size={22} />
        <Text style={styles.title}> Tarjetas</Text>
      </View>

      {/* Tabla */}
      <FlatList
        data={tarjetas}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  title: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1f2d5a',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 15,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
