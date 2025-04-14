import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

const { width } = Dimensions.get('window');

export default function PartidosScreen({ route }) {
  const { torneoId } = route.params;
  const [partidos, setPartidos] = useState([]);
  const [jornadaLabel, setJornadaLabel] = useState('');
  const [loading, setLoading] = useState(true);

  const obtenerPartidos = async () => {
    try {
      const response = await API.get(`/partidos/calendario/${torneoId}`);
      const calendario = response.data;

      const jornadas = Object.keys(calendario).sort((a, b) => b - a);
      if (jornadas.length > 0) {
        const ultima = jornadas[0];
        setPartidos(calendario[ultima]);
        setJornadaLabel(`Jornada ${ultima}`);
      }
    } catch (error) {
      console.log('Error cargando partidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPartidos();
  }, [torneoId]);

  const renderPartido = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.logoLocal }} style={styles.logo} />
        <Text style={styles.resultado}>{item.golesLocal ?? 0} : {item.golesVisitante ?? 0}</Text>
        <Image source={{ uri: item.logoVisitante }} style={styles.logo} />
      </View>
      <View style={styles.nombres}>
        <Text style={styles.nombreEquipo}>{item.nombreLocal}</Text>
        <Text style={styles.nombreEquipo}>{item.nombreVisitante}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.infoText}>{item.nombreCampo} - {item.nombreCancha}</Text>
          <Text style={styles.infoText}>{item.hora}</Text>
          <Text style={styles.arbitro}>{item.nombreArbitro}</Text>
        </View>
        <Icon name="map-marker-alt" type="font-awesome-5" color="#d80027" size={20} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.header}>
        <Image source={require('../../../assets/ProximosPartidos.png')} style={styles.icono} />
        <Text style={styles.headerText}> Partidos</Text>
      </View>

      <View style={styles.jornadaContainer}>
        <Text style={styles.jornadaText}>
          <Text style={styles.jornadaBold}>{jornadaLabel}</Text>
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={partidos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={renderPartido}
        />
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
    marginLeft: 10,
  },
  jornadaContainer: {
    backgroundColor: '#0e1b39',
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  jornadaText: {
    fontSize: 15,
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  jornadaBold: {
    fontWeight: 'bold',
    color: '#FDBA12',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 14,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 5,
  },
  nombreEquipo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
  },
  arbitro: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
  },
  icono: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
