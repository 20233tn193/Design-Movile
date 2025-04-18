import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function TarjetasScreen({ route }) {
  const { torneoId } = route.params;
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await API.get(`/estadisticas/tarjetas/${torneoId}`);
        const datos = response.data.map((item) => ({
          nombre: `${item.nombre || ''} ${item.apellido || ''}`,
          equipoNombre: item.equipoNombre || 'Sin equipo',
          equipoEscudo: item.equipoEscudo || 'https://via.placeholder.com/40',
          amarillas: item.amarillas,
          rojas: item.rojas,
        }));
        setTarjetas(datos);
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
      <FranjasDecorativas />

      <View style={styles.header}>
        <Icon name="credit-card" type="font-awesome-5" color="#FDBA12" size={20} />
        <Text style={styles.title}> Tarjetas</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Nombre</Text>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Equipo</Text>
        <View style={[styles.cardIcons, { flex: 1, justifyContent: 'flex-end' }]}>
          <Icon name="square" type="font-awesome" color="#FDBA12" size={16} />
          <Icon name="square" type="font-awesome" color="red" style={{ marginLeft: 10 }} size={16} />
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
              <Text style={[styles.text, { flex: 2 }]}>
                {item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin nombre'}
              </Text>
              <Text style={[styles.text, { flex: 2 }]}>
                {item.equipoNombre || 'Sin equipo'}
              </Text>
              <View style={[styles.cardIcons, { flex: 1, justifyContent: 'flex-end' }]}>
                <Text style={[styles.text, { marginRight: 15 }]}>{item.amarillas}</Text>
                <Text style={styles.text}>{item.rojas}</Text>
              </View>
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
    textAlign: 'left',
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#333',
  },
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipoText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#333',
  },
  logo: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
});