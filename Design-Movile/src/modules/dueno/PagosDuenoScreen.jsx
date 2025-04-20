import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import ModalStripeRedirect from './ModalStripeRedirect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function PagosDuenoScreen({ navigation }) {
  const [modalStripeVisible, setModalStripeVisible] = useState(false);
  const route = useRoute();
  const { equipo, torneo } = route.params || {};
  const [pagos, setPagos] = useState([]);
  const [nombreEquipoConcepto, setNombreEquipoConcepto] = useState('NombreEquipo');

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const duenoId = await AsyncStorage.getItem('duenoId');
        const res = await API.get(`/pagos/dueno/${duenoId}`);
        setPagos(res.data);
      } catch (error) {
        console.log('❌ Error al obtener pagos:', error);
      }
    };

    fetchPagos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>💰 Pagos</Text>
      </View>

      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View style={styles.torneoCard}>
          <Image
            source={{ uri: torneo.logoSeleccionado || 'https://placehold.co/50x50' }}
            style={styles.logo}
          />
          <View style={styles.torneoInfo}>
            <Text style={styles.nombreTorneo}>{torneo?.nombreTorneo || 'Nombre torneo'}</Text>
            <Text
              style={[styles.estado,
              torneo.estado?.toUpperCase().trim() === 'ABIERTO' ? styles.abierto
                : torneo.estado?.toUpperCase().trim() === 'FINALIZADO' ? styles.finalizado
                  : torneo.estado?.toUpperCase().trim() === 'CERRADO' ? styles.cerrado
                    : torneo.estado?.toUpperCase().trim() === 'EN CURSO' ? styles.enCurso
                      : styles.otros]}
            >
              {torneo.estado}
            </Text>
            <Text style={styles.subtexto}>{torneo?.fechaInicio || 'Fecha'} · {torneo?.numeroEquipos || 0} clubs</Text>
          </View>
        </View>

        <View style={styles.encabezadoTabla}>
          <Text style={styles.th}>Nombre</Text>
          <Text style={styles.th}># Partido</Text>
          <Text style={styles.th}>Monto</Text>
          <Text style={styles.th}>Estatus</Text>
        </View>

        {pagos.length === 0 ? (
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>No hay pagos disponibles.</Text>
        ) : (() => {
          let arbitrajeCount = 1;
          let canchaCount = 1;

          return pagos.map((pago, i) => {
            let numeroPartido = '-';
            if (pago.tipo === 'arbitraje') {
              numeroPartido = arbitrajeCount++;
            } else if (pago.tipo === 'uso_de_cancha') {
              numeroPartido = canchaCount++;
            }

            return (
              <View key={i} style={styles.fila}>
                <Text style={styles.td}>
                  {pago.tipo === 'inscripcion'
                    ? 'Inscripción'
                    : pago.tipo === 'arbitraje'
                      ? 'Arbitraje'
                      : pago.tipo === 'uso_de_cancha'
                        ? 'Cancha'
                        : pago.tipo}
                </Text>
                <Text style={styles.td}>
                  {numeroPartido !== '-' ? `P${numeroPartido}` : '-'}
                </Text>
                <Text style={styles.td}>${pago.monto}</Text>
                <Text style={[styles.td, { color: pago.estatus === 'pendiente' ? 'red' : 'green' }]}>
                  {pago.estatus.charAt(0).toUpperCase() + pago.estatus.slice(1)}
                </Text>
              </View>
            );
          });
        })()}

        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.btnAccion}
            onPress={() => {
              if (equipo?.nombre) {
                setNombreEquipoConcepto(equipo.nombre); // ✅ guarda el nombre real
              }
              setModalStripeVisible(true);
            }}
          >
            <Text style={styles.btnTexto}>Datos de Pago</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalStripeRedirect
        visible={modalStripeVisible}
        onClose={() => setModalStripeVisible(false)}
        navigation={navigation}
        nombreEquipo={nombreEquipoConcepto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    zIndex: 2,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  franja: {
    position: 'absolute',
    width: width * 2.1,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 80,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '-10deg' }],
  },
  franjaNegraTop: {
    top: 120,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 160,
    left: -width,
    backgroundColor: '#e6e6e6',
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
    bottom: -10,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
  torneoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1b39',
    borderRadius: 12,
    padding: 12,
    margin: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  torneoInfo: {
    flex: 1,
  },
  nombreTorneo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  estado: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  abierto: {
    color: 'green',
  },
  finalizado: {
    color: 'red',
  },
  cerrado: {
    color: '#FFA500',
  },
  enCurso: {
    color: '#007BFF',
  },
  otros: {
    color: '#FDBA12',
  },
  subtexto: {
    color: 'white',
    fontSize: 12,
  },
  encabezadoTabla: {
    flexDirection: 'row',
    backgroundColor: '#0e1b39',
    padding: 10,
    marginHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  th: {
    flex: 1,
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#FDBA12',
    textAlign: 'center'
  },
  fila: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  td: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center'
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  btnAccion: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  btnTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
});
