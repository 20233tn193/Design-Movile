import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Icon } from '@rneui/themed';
import API, { obtenerCampoPorId } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import ModalMapa from '../../kernel/components/ModalMapa';

const { width } = Dimensions.get('window');

export default function PartidosScreen({ route }) {
  const [calendarioCompleto, setCalendarioCompleto] = useState([]);
  const [loading, setLoading] = useState(true);
  const torneoId = route?.params?.torneoId || 'DEFAULT_ID';
  const navigation = useNavigation();
  const [campeon, setCampeon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });

  const abrirModalConMapa = async (campoId) => {
    try {
      const response = await API.get(`/campos/${campoId}`);
      const campo = response.data;

      console.log('🌍 Campo ID:', campoId);
      console.log('📍 Latitud:', campo.latitud);
      console.log('📍 Longitud:', campo.longitud);

      setCoordenadas({ latitud: campo.latitud, longitud: campo.longitud });
      setModalVisible(true);
    } catch (error) {
      console.error('Error al obtener campo:', error);
      Alert.alert('Error', 'No se pudo cargar la ubicación del campo');
    }
  };

  const obtenerPartidos = async () => {
    try {
      const [partidosRes, logosRes] = await Promise.all([
        API.get(`/partidos/torneo/${torneoId}`),
        API.get(`/partidos/calendario/${torneoId}`)
      ]);

      const partidosConRegistro = partidosRes.data;
      const logosPorId = {};

      Object.values(logosRes.data).flat().forEach(p => {
        logosPorId[p.id] = {
          logoEquipoA: p.logoEquipoA,
          logoEquipoB: p.logoEquipoB,
        };
      });

      const partidosPorJornada = {};

      for (const partido of partidosConRegistro) {
        const jornada = partido.jornada || 'Sin jornada';
        const logos = logosPorId[partido.id] || {};

        partido.logoEquipoA = logos.logoEquipoA || '';
        partido.logoEquipoB = logos.logoEquipoB || '';

        try {
          const campo = await obtenerCampoPorId(partido.campoId);
         
          partido.latitud = campo.latitud;
          partido.longitud = campo.longitud;
        } catch (error) {
          console.error('Error al obtener campo:', error);
        }

        if (!partidosPorJornada[jornada]) partidosPorJornada[jornada] = [];
        partidosPorJornada[jornada].push(partido);
      }

      const jornadasOrdenadas = Object.keys(partidosPorJornada)
        .sort((a, b) => b - a)
        .map(jornada => ({
          jornada,
          partidos: partidosPorJornada[jornada],
        }));

      setCalendarioCompleto(jornadasOrdenadas);
    } catch (error) {
      console.error('Error cargando partidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerTorneo = async () => {
    try {
      const response = await API.get(`/torneos/${torneoId}`);
      const data = response.data;

      if (data.estado?.toUpperCase() === 'FINALIZADO' && data.campeonId) {
        const equipoResponse = await API.get(`/equipos/${data.campeonId}`);
        const equipo = equipoResponse.data;
        console.log("🏆 Campeón obtenido:", equipo);

        setCampeon({
          nombre: equipo.nombre,
          logo: equipo.logoUrl?.startsWith('data:image')
            ? equipo.logoUrl
            : `data:image/jpeg;base64,${equipo.logoUrl}`
        });
      }
    } catch (error) {
      console.error('Error al obtener torneo o campeón:', error);
    }
  };

  useEffect(() => {
    obtenerTorneo();
    obtenerPartidos();
  }, []);

  const renderPartido = (item) => {
    return (
      <TouchableOpacity
        style={styles.card}
        key={item.id}
        onPress={() => {
          API.get(`/partidos/completo/${item.id}`).then((response) => {
            const { registro, jugadoresLocal, jugadoresVisitante } = response.data;

            const jugadores = [
              ...jugadoresLocal.map(j => ({ ...j, equipo: 'local', equipoNombre: item.nombreEquipoA })),
              ...jugadoresVisitante.map(j => ({ ...j, equipo: 'visitante', equipoNombre: item.nombreEquipoB }))
            ];

            if (!registro || registro.length === 0) {
              console.log('📭 Partido aún sin registro');
              Alert.alert(
                'Registro no disponible',
                'Este partido aún no ha sido registrado.',
                [{ text: 'OK', style: 'cancel' }]
              );
              return;
            }

            navigation.navigate('RegistroCerrado', {
              jugadores,
              resultados: registro
            });
          }).catch((error) => {
            console.error('❌ Error al obtener detalles del partido:', error);
          });
        }}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: item.logoEquipoA?.startsWith('http') || item.logoEquipoA?.startsWith('data:image') ? item.logoEquipoA : 'https://via.placeholder.com/60x60?text=L' }}
            style={styles.logo}
          />
          <Text style={styles.resultado}>
            {(item.golesEquipoA == null || item.golesEquipoB == null || (item.golesEquipoA === 0 && item.golesEquipoB === 0))
              ? 'Pendiente'
              : `${item.golesEquipoA} : ${item.golesEquipoB}`}
          </Text>
          <Image
            source={{ uri: item.logoEquipoB?.startsWith('http') || item.logoEquipoB?.startsWith('data:image') ? item.logoEquipoB : 'https://via.placeholder.com/60x60?text=V' }}
            style={styles.logo}
          />
        </View>

        <View style={styles.nombres}>
          <Text style={styles.nombreEquipo}>{item.nombreEquipoA}</Text>
          <Text style={styles.nombreEquipo}>{item.nombreEquipoB}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoText}>{item.nombreCampo} - {item.nombreCancha}</Text>
            <Text style={styles.infoText}>{item.hora}</Text>
            <Text style={styles.arbitro}>{item.nombreArbitro}</Text>
          </View>
          <TouchableOpacity onPress={() => abrirModalConMapa(item.campoId)}>
            <Icon name="map-marker-alt" type="font-awesome-5" color="#d80027" size={30} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
        <Text style={styles.headerText}>Partidos</Text>
      </View>

      {campeon && (
        <View style={styles.campeonContainer}>
          <Text style={styles.campeonTitulo}>🏆 Campeón del Torneo</Text>
          <View style={styles.campeonCard}>
            <Image
              source={{
                uri:
                  campeon.logo && (campeon.logo.startsWith('data:image') || campeon.logo.startsWith('http'))
                    ? campeon.logo
                    : 'https://via.placeholder.com/60x60?text=🏆',
              }}
              style={styles.logoCampeon}
            />
            <Text style={styles.campeonNombre}>{campeon.nombre}</Text>
          </View>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {calendarioCompleto.map(({ jornada, partidos }) => (
            <View key={jornada}>
              <View style={styles.jornadaContainer}>
                <Text style={styles.jornadaText}>
                  <Text style={styles.jornadaBold}>Jornada {jornada}</Text>
                </Text>
              </View>
              {partidos.map(renderPartido)}
            </View>
          ))}
        </ScrollView>
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
  icono: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  campeonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
  },
  campeonTitulo: {
    backgroundColor: '#0e1b39',
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  campeonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1b39', // verde bonito opaco
    padding: 7,
    borderRadius: 5,
    width: '80%',
    justifyContent: 'center',
  },
  campeonNombre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FDBA12',
  },
  logoCampeon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 12,
  }
});
