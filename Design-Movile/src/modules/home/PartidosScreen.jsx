import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '@rneui/themed';
import API from '../../api/api';

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

  const renderPartido = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={{
              uri:
                item.logoLocal && item.logoLocal.startsWith('http')
                  ? item.logoLocal
                  : 'https://via.placeholder.com/60x60?text=L',
            }}
            style={styles.logo}
          />
          <Text style={styles.resultado}>
            {item.golesLocal ?? 0} : {item.golesVisitante ?? 0}
          </Text>
          <Image
            source={{
              uri:
                item.logoVisitante && item.logoVisitante.startsWith('http')
                  ? item.logoVisitante
                  : 'https://via.placeholder.com/60x60?text=V',
            }}
            style={styles.logo}
          />
        </View>

        <View style={styles.nombres}>
          <Text style={styles.nombreEquipo}>{item.nombreLocal}</Text>
          <Text style={styles.nombreEquipo}>{item.nombreVisitante}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoText}>
              {item.nombreCampo} - {item.nombreCancha}
            </Text>
            <Text style={styles.infoText}>{item.hora}</Text>
            <Text style={styles.arbitro}>{item.nombreArbitro}</Text>
          </View>
          <Icon name="map-marker-alt" type="font-awesome-5" color="#d80027" size={20} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

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
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    backgroundColor: '#eee',
    borderRadius: 5,
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