import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { color } from '@rneui/base';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function InscripcionesDuenoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [torneos, setTorneos] = useState([]);
  const [torneosInscritos, setTorneosInscritos] = useState([]);
  const [pagosInscripcion, setPagosInscripcion] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const fetchTorneos = async () => {
        try {
          const duenoId = await AsyncStorage.getItem('duenoId');
          console.log('🔑 duenoId obtenido:', duenoId);

          if (!duenoId) {
            console.warn('⚠️ duenoId no encontrado');
            return;
          }

          const token = await AsyncStorage.getItem('token');

          if (!token) {
            console.warn('❌ Token no encontrado en almacenamiento');
            return;
          }

          

          const resEquipos = await API.get(`/equipos/dueño/${duenoId}`);
          const equipos = resEquipos.data || [];
          setEquipos(equipos);
          const torneoIds = equipos
            .map(e => e.torneoId?.toString?.())
            .filter(id => !!id);

          const resTorneos = await API.get('/torneos');
          const todosTorneos = resTorneos.data || [];
          const torneosInscritos = todosTorneos.filter(t =>
            torneoIds.includes(t.id)
          );
          const torneosDisponibles = todosTorneos.filter(t =>
            t.estado?.toUpperCase().trim() === "ABIERTO" &&
            !torneoIds.includes(t.id)
          );

          const resPagos = await API.get(`/pagos/dueno/${duenoId}`);
          const pagos = resPagos.data || [];
          const pagosFiltrados = pagos.filter(p => p.tipo === "inscripcion" && ["pagado", "pendiente"].includes(p.estatus));

          setPagosInscripcion(pagosFiltrados);
          setTorneos(torneosDisponibles);
          setTorneosInscritos(torneosInscritos);
          console.log('Lógica completada sin errores');
        } catch (err) {
          console.log('Error al cargar torneos:', err);
        }
      };

      fetchTorneos();

      if (route.params?.recargar) {
        console.log('Recargando por parámetro de inscripción...');
      }

    }, [route.params?.recargar])
  );

  const torneosFiltrados = torneos.filter((t) =>
    ((t.nombreTorneo || '') + ' ' + (t.estado || ''))
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="trophy" type="font-awesome" color="#FDBA12" size={18} style={{ marginRight: 8 }} />
          <Text style={styles.headerText}>Inscripciones</Text>
        </View>

        <View style={styles.decorativas}>
          <View style={styles.triangleTopRed} />
          <View style={[styles.franja, styles.franjaNegraTop]} />
          <View style={[styles.franja, styles.franjaGrisTop]} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.buscadorYInscritos}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Buscar torneos..."
                placeholderTextColor="#888"
                style={styles.input}
                value={busqueda}
                onChangeText={setBusqueda}
              />
              <TouchableOpacity style={styles.btnBuscar}>
                <Text style={styles.btnBuscarTexto}>Buscar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardInscritoBox}>
              <Text style={styles.cardInscritoTitulo}>Torneos inscritos</Text>
              {torneosInscritos.length === 0 ? (
                <Text style={styles.cardInscritoTexto}>
                  Aquí aparecerán los torneos a los que estás inscrito
                </Text>
              ) : (torneosInscritos.map((torneo, index) => {
                const pago = pagosInscripcion.find(p => p.torneoId === torneo.id);
                const equipo = equipos.find(e => e.torneoId === torneo.id);
              
                return (
                  <View
                    key={index}
                    style={styles.cardDisponible}
                  >
                    <Image source={{ uri: torneo.logoSeleccionado }} style={styles.logo} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{torneo.nombreTorneo}</Text>
                      <Text
                        style={[
                          styles.estado,
                          torneo.estado?.toUpperCase().trim() === 'ABIERTO'
                            ? styles.abierto
                            : torneo.estado?.toUpperCase().trim() === 'FINALIZADO'
                            ? styles.finalizado
                            : torneo.estado?.toUpperCase().trim() === 'CERRADO'
                            ? styles.cerrado
                            : torneo.estado?.toUpperCase().trim() === 'EN CURSO'
                            ? styles.enCurso
                            : styles.otros,
                        ]}
                      >
                        {torneo.estado}
                      </Text>
                      {pago && (
                        <Text
                          style={[
                            styles.EstatusPago,
                            { color: pago.estatus === 'pendiente' ? '#FF4141' : '#28D914' }
                          ]}
                        >
                          {pago.estatus === 'pendiente' ? 'Pago en PROCESO' : 'Pago APROBADO'}
                        </Text>
                      )}
                      <Text style={styles.cardText}>
                        {torneo.fechaInicio} · {torneo.numeroEquipos} clubs
                      </Text>
                    </View>
              
                    {pago && (
                      <View style={{ alignItems: 'center', gap: 8 }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (pago.estatus === 'pendiente') {
                              alert('Tu pago está en proceso. Espera confirmación para agregar jugadores.');
                            } else {
                              navigation.navigate('JugadoresRegistradosDueno', { torneo });
                            }
                          }}
                          style={{
                            backgroundColor: pago.estatus === 'pagado' ? '#28D914' : '#ccc',
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Icon name="user-plus" type="font-awesome" color="#fff" size={16} />
                        </TouchableOpacity>
              
                        <TouchableOpacity
                          style={[styles.btnPago, { backgroundColor: '#C12143' }]}
                          onPress={() => {
                            if (equipo) {
                              navigation.navigate('PagosDuenoScreen', { equipo, torneo });
                            } else {
                              alert('No se encontró el equipo correspondiente.');
                            }
                          }}
                        >
                          <Icon name="dollar" type="font-awesome" color="#fff" size={20} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }))}
            </View>
          </View>

          <Text style={styles.subtituloDisponible}>Torneos Disponibles</Text>

          {torneosFiltrados.map((torneo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardDisponible}
              onPress={() => navigation.navigate('DetalleTorneoDueno', {
                torneo,
                yaInscrito: torneosInscritos.length > 0
              })}
            >
              <Image source={{ uri: torneo.logoSeleccionado }} style={styles.logo} />
              <View>
                <Text style={styles.cardTitle}>{torneo.nombreTorneo}</Text>
                <Text
                  style={[
                    styles.estado,
                    torneo.estado?.toUpperCase().trim() === 'ABIERTO'
                      ? styles.abierto
                      : torneo.estado?.toUpperCase().trim() === 'FINALIZADO'
                        ? styles.finalizado
                        : torneo.estado?.toUpperCase().trim() === 'CERRADO'
                          ? styles.cerrado
                          : torneo.estado?.toUpperCase().trim() === 'EN CURSO'
                            ? styles.enCurso
                            : styles.otros,
                  ]}
                >
                  {torneo.estado}
                </Text>
                <Text style={styles.cardText}>{torneo.fechaInicio}   · {torneo.numeroEquipos} clubs</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // esto asegura el notch oscuro
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeTop: {
    flex: 1,
    backgroundColor: '#000', // solo el notch
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // fondo blanco del contenido
  },
  header: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',

  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  decorativas: {
    height: 25,
    marginBottom: 10,
    position: 'relative', // ← ¡Clave!
    zIndex: 0,
  },
  triangleTopRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: width,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 40,
  },
  franjaNegraTop: {
    top: 60,
    left: -width,
    backgroundColor: '#1a1a1a',
    transform: [{ rotate: '-10deg' }],
  },
  franjaGrisTop: {
    top: 90,
    left: -width,
    backgroundColor: '#e6e6e6',
    transform: [{ rotate: '-10deg' }],
  },
  scroll: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
    zIndex: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    zIndex: 2,
  },
  btnBuscar: {
    backgroundColor: '#d80027',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnBuscarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtituloDisponible: {
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: '#0e1b39',
    color: '#FDBA12',
    padding: 10,
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  cardDisponible: {
    backgroundColor: '#0e1b39',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardText: {
    color: '#ccc',
    fontSize: 12,
  },
  estadoActivo: {
    color: 'lime',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardInscritoBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: -10,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardInscritoTitulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0e1b39',
    marginBottom: 4,
  },
  cardInscritoTexto: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  estado: {
    fontSize: 14,
    marginTop: 4,
  },
  abierto: {
    color: '#00B61B',
    fontWeight: 'bold',
  },
  finalizado: {
    color: 'red',
    fontWeight: 'bold',
  },
  cerrado: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  enCurso: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  otros: {
    color: '#888',
    fontWeight: 'bold',
  },
  EstatusPago: {
    fontSize: 14,
    color: '#28D914',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  btnPago: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 40,
  },
});
