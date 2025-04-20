import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../api/api';
import ModalConfirmarDescargaCredenciales from './ModalConfirmarDescargaCredenciales';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get('window');

export default function JugadoresRegistradosDuenoScreen({ navigation, route }) {
  const [modalConfirmarVisible, setModalConfirmarVisible] = useState(false);
  const [equipo, setEquipo] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [pagoEstatus, setPagoEstatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const torneo = route.params?.torneo;
  const estadoValido = torneo?.estado?.toUpperCase().trim();
  const esEditable = estadoValido === 'ABIERTO' || estadoValido === 'CERRADO';

  const mostrarAlertaNoEditable = () => {
    alert('Esta acción solo está disponible si el torneo está ABIERTO o CERRADO.');
  };

  const descargarCredencialesPDF = async (equipoId) => {
    try {
      console.log('📥 Iniciando descarga de credenciales para:', equipoId);
      const url = `${API.defaults.baseURL}/equipos/${equipoId}/credenciales`;
      const fileUri = FileSystem.documentDirectory + 'credenciales.pdf';
  
      const response = await FileSystem.downloadAsync(url, fileUri, {
        headers: {
          Accept: 'application/pdf',
        },
      });
  
      console.log('✅ Archivo descargado en:', response.uri);
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(response.uri);
      } else {
        Alert.alert('Descarga completa', 'Archivo guardado pero no se pudo compartir automáticamente.');
      }
    } catch (error) {
      console.error('❌ Error al descargar credenciales:', error);
      Alert.alert('Error', 'No se pudieron generar las credenciales. Asegúrate de que el torneo esté cerrado y el pago aprobado.');
      throw error; // 🔥 Importante: para que el modal sepa que falló
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setJugadores([]);
          setLoading(true);
          const duenoId = await AsyncStorage.getItem('duenoId');

          const equipoPagoRes = await API.get(`/equipos/torneo-con-dueno/${torneo.id}`);
          const equipoEncontrado = equipoPagoRes.data.find(e => e.duenoNombre && e.pagoEstatus);
          setPagoEstatus(equipoEncontrado?.pagoEstatus);

          const equipoDuenoRes = await API.get(`/equipos/dueño/${duenoId}`);
          const equipoFiltrado = equipoDuenoRes.data.find(e => e.torneoId === torneo.id);
          setEquipo(equipoFiltrado);
          await AsyncStorage.setItem('equipoId', equipoFiltrado.id);

          if (equipoFiltrado?.id) {
            const jugadoresRes = await API.get(`/jugadores/equipo/${equipoFiltrado.id}`);
            setJugadores(jugadoresRes.data);
          }
        } catch (err) {
          console.log('Error al cargar datos:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [torneo])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Jugadores Registrados</Text>
      </View>

      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.torneoCard}>
        <Image source={{ uri: torneo.logoSeleccionado }} style={styles.logo} />
        <View style={styles.torneoInfo}>
          <Text style={styles.nombreTorneo}>{torneo.nombreTorneo}</Text>
          <Text
            style={[styles.estado,
              torneo.estado?.toUpperCase().trim() === 'ABIERTO' ? styles.abierto :
              torneo.estado?.toUpperCase().trim() === 'FINALIZADO' ? styles.finalizado :
              torneo.estado?.toUpperCase().trim() === 'CERRADO' ? styles.cerrado :
              torneo.estado?.toUpperCase().trim() === 'EN CURSO' ? styles.enCurso :
              styles.otros]}
          >
            {torneo.estado}
          </Text>
          <Text style={styles.subtexto}>{torneo.fechaInicio} · {torneo.numeroEquipos} clubs</Text>
        </View>
        <TouchableOpacity
          style={[styles.btnPago, { backgroundColor: '#C12143' }]}
          onPress={() => navigation.navigate('PagosDuenoScreen', { equipo, torneo })}
        >
          <Icon name="dollar" type="font-awesome" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.encabezadoTabla}>
        <Text style={styles.th}>Nombre</Text>
        <Text style={styles.th}>Apellido</Text>
        <Text style={styles.thAcciones}>Acciones</Text>
      </View>

      <ScrollView style={styles.listaJugadores}>
        {loading ? (
          <ActivityIndicator size="large" color="#0e1b39" style={{ marginVertical: 20 }} />
        ) : jugadores.length === 0 ? (
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>No hay jugadores registrados.</Text>
        ) : jugadores.map((j, i) => (
          <View key={i} style={styles.fila}>
            <Image source={{ uri: j.fotoUrl }} style={styles.avatar} />
            <Text style={styles.td}>{j.nombre}</Text>
            <Text style={styles.td}>{j.apellido}</Text>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => navigation.navigate('RegistroJugadorScreen', { jugador: j }, { equipoId: equipo.id })}>
                <Icon name="pencil" type="font-awesome" size={18} color="#d80027" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('DetallesJugadorScreen', { jugador: j })}>
                <Icon name="id-card" type="font-awesome" size={18} color="#0e1b39" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.botones}>
        <TouchableOpacity
          style={[styles.btnGenerar, { backgroundColor: esEditable ? '#FDBA12' : '#ccc' }]}
          onPress={() => {
            if (esEditable) {
              setModalConfirmarVisible(true);
            } else {
              mostrarAlertaNoEditable();
            }
          }}
        >
          <Text style={styles.btnTextoGenerar}>Generar Credenciales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnAgregar, { backgroundColor: esEditable ? '#0e1b39' : '#999' }]}
          onPress={() => {
            if (esEditable) {
              navigation.navigate('RegistroJugadorScreen', { equipoId: equipo?.id });
            } else {
              mostrarAlertaNoEditable();
            }
          }}
        >
          <Text style={styles.btnTextoAgregar}>AGREGAR</Text>
        </TouchableOpacity>
      </View>

      <ModalConfirmarDescargaCredenciales
  visible={modalConfirmarVisible}
  onClose={() => setModalConfirmarVisible(false)}
  onConfirm={() => descargarCredencialesPDF(equipo.id)} // sin async ni setModalConfirmarVisible
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
  estadoCerrado: {
    color: '#d80027',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subtexto: {
    color: 'white',
    fontSize: 12,
  },
  btnPago: {
    backgroundColor: '#C12143',
    borderRadius: 8,
    padding: 8,
    width: 60,
    height: 40,
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
  },
  thAcciones: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FDBA12',
  },
  listaJugadores: {
    marginHorizontal: 15,
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
    fontSize: 18,
  },
  acciones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  btnGenerar: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#ECAE28',
  },
  btnAgregar: {
    flex: 1,
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextoGenerar: {
    color: '#000',
    fontWeight: 'bold',
  },
  btnTextoAgregar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
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
    color: '#FFA500', // naranja
  },
  enCurso: {
    color: '#007BFF', // azul
  },
  otros: {
    color: '#FDBA12',
  },
});
