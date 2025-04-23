import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { obtenerPartidosPorArbitro, obtenerCampoPorId } from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';
import ModalMapa from '../../kernel/components/ModalMapa';
import { useFocusEffect } from '@react-navigation/native';

export default function ArbitroHomeScreen({ navigation }) {
  const [partidos, setPartidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });

  useFocusEffect(
    useCallback(() => {
      const fetchPartidos = async () => {
        setLoading(true);
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
    }, [])
  );

  const abrirModalConMapa = async (campoId) => {
    try {
      const campo = await obtenerCampoPorId(campoId);
      setCoordenadas({ latitud: campo.latitud, longitud: campo.longitud });
      setModalVisible(true);
    } catch (error) {
      console.error('Error al obtener campo:', error);
      Alert.alert('Error', 'No se pudo cargar la ubicación del campo');
    }
  };

  const filteredPartidos = partidos.filter((p) =>
    (p.nombreEquipoA + ' ' + p.nombreEquipoB + ' ' + p.nombreCampo + ' ' + p.nombreCancha)
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.header}>
        <Icon name="calendar" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Partidos Asignados</Text>
      </View>

      <View style={styles.buscadorContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#555"
          style={styles.inputBuscar}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#001F4E" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredPartidos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No hay partidos</Text>}
          renderItem={({ item }) => {
            const finalizado = item.estado === 'finalizado';
            return (
              <TouchableOpacity
                onPress={() => {
                  if (!finalizado) {
                    navigation.navigate('DetallePartido', { partidoId: item.id });
                  }
                }}
                disabled={finalizado}
              >
                <View style={[styles.card, finalizado && styles.cardFinalizado]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.vsText, finalizado && styles.textFinalizado]}>
                      {item.nombreEquipoA || 'Equipo A'} vs {item.nombreEquipoB || 'Equipo B'}
                    </Text>
                    <Text style={[styles.cardSubText, finalizado && styles.textFinalizado]}>
                      {item.nombreCampo} - {item.nombreCancha}
                    </Text>
                    <Text style={[styles.cardSubText, finalizado && styles.textFinalizado]}>
                      {item.fecha}   {item.hora}
                    </Text>
                    {finalizado && (
                      <Text style={[styles.cardSubText, { fontStyle: 'italic', color: '#bbb' }]}>
                        Partido terminado
                      </Text>
                    )}
                  </View>
                  {!finalizado && (
                    <TouchableOpacity onPress={() => abrirModalConMapa(item.campoId)}>
                      <Icon
                        name="map-marker"
                        type="font-awesome"
                        color="#ff4d4d"
                        size={28}
                        containerStyle={{ marginLeft: 40 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <ModalMapa
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        latitud={coordenadas.latitud}
        longitud={coordenadas.longitud}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative', overflow: 'hidden' },
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 50,
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
  cardFinalizado: {
    backgroundColor: '#d9d9d9',
  },
  vsText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardSubText: { color: '#fff', fontSize: 12, marginBottom: 2 },
  textFinalizado: {
    color: '#666',
  },
});
