import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerPartidosPorArbitro } from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativasSuave'; // <-- Importante

export default function ArbitroHomeScreen({ navigation }) {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const arbitroId = await AsyncStorage.getItem('arbitroId');
        if (!arbitroId) {
          console.warn('⚠️ arbitroId no encontrado');
          return;
        }

        const data = await obtenerPartidosPorArbitro(arbitroId);
        setPartidos(data);
      } catch (error) {
        console.log('❌ Error al cargar partidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  return (
    <View style={styles.container}>
      <FranjasDecorativas /> {/* ✅ Aquí se usa el componente */}

      <View style={styles.header}>
        <Icon name="calendar" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Partidos Asignados</Text>
      </View>

      <View style={styles.buscadorContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#555"
          style={styles.inputBuscar}
        />
        <TouchableOpacity style={styles.btnBuscar}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#001F4E" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={partidos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DetallePartido', { partidoId: item.id })}>
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vsText}>
                    {item.equipoLocal?.nombre || 'Local'} vs {item.equipoVisitante?.nombre || 'Visitante'}
                  </Text>
                  <Text style={styles.cardSubText}>
                    {item.nombreCampo} - {item.nombreCancha}
                  </Text>
                  <Text style={styles.cardSubText}>
                    {item.fecha}   {item.hora}
                  </Text>
                </View>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#ff4d4d"
                  size={28}
                  containerStyle={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => navigation.replace('BottomTabs')}>
          <Icon name="trophy" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('CuentaArbitro')}>
          <Icon name="user" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Estadisticas')}>
          <Icon name="bar-chart" type="font-awesome" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative', overflow: 'hidden' },
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: { color: '#FDBA12', fontSize: 18, fontWeight: 'bold' },
  buscadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    zIndex: 10,
  },
  inputBuscar: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  btnBuscarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#0e1b39',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  vsText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardSubText: { color: '#fff', fontSize: 12, marginBottom: 2 },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#1a1a1a',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
});
