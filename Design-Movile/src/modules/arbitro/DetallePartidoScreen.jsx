import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  Dimensions, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalConfirmacion from './ModalConfirmacion';
import { obtenerPartidoPorId, obtenerJugadoresPorEquipo, registrarResultadoPartido } from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

const { width } = Dimensions.get('window');

export default function DetallePartidoScreen() {
  const [partido, setPartido] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [goles, setGoles] = useState([]);
  const [rojas, setRojas] = useState([]);
  const [amarillas, setAmarillas] = useState([]);
  const [seccion, setSeccion] = useState('Asistencia');
  const [loading, setLoading] = useState(true);
  const [registroCerrado, setRegistroCerrado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { partidoId } = route.params;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const p = await obtenerPartidoPorId(partidoId);
        setPartido(p);

        const jugadoresLocal = await obtenerJugadoresPorEquipo(p.equipoAId);
        const jugadoresVisitante = await obtenerJugadoresPorEquipo(p.equipoBId);
        jugadoresLocal.forEach(j => j.equipo = 'local');
        jugadoresVisitante.forEach(j => j.equipo = 'visitante');

        const todos = [...jugadoresLocal, ...jugadoresVisitante];
        setJugadores(todos);

        setAsistencias(todos.map(() => false));
        setGoles(todos.map(() => 0));
        setRojas(todos.map(() => 0));
        setAmarillas(todos.map(() => 0));
      } catch (err) {
        console.log('Error al cargar partido o jugadores:', err);
        Alert.alert('Error', 'No se pudo cargar la información del partido.');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [partidoId]);

  const aumentar = (arr, setArr, i) => {
    if (registroCerrado) return;

    const nuevo = [...arr];

    if (seccion === 'Amarilla') {
      if (nuevo[i] >= 2) {
        Alert.alert('Expulsión automática', 'El jugador ya tiene dos amarillas. Se asignó tarjeta roja y fue expulsado.');
        return;
      }
      nuevo[i]++;
      if (nuevo[i] === 2) {
        const nuevasRojas = [...rojas];
        nuevasRojas[i] = 1;
        setRojas(nuevasRojas);
      }
    } else if (seccion === 'Roja') {
      nuevo[i] = 1;
    } else {
      nuevo[i]++;
    }

    setArr(nuevo);
  };

  const disminuir = (arr, setArr, i) => {
    if (registroCerrado) return;
    const nuevo = [...arr];
    if (nuevo[i] > 0) {
      nuevo[i]--;
      if (seccion === 'Amarilla' && nuevo[i] < 2) {
        const nuevasRojas = [...rojas];
        nuevasRojas[i] = 0;
        setRojas(nuevasRojas);
      }
      setArr(nuevo);
    }
  };

  const toggleAsistencia = (index) => {
    if (registroCerrado) return;
    const nuevo = [...asistencias];
    nuevo[index] = !nuevo[index];
    setAsistencias(nuevo);
  };

  const handleTerminarPartido = () => {
    setModalVisible(true);
  };

  const confirmarCierre = async () => {
    setModalVisible(false);
    setRegistroCerrado(true);

    try {
      const registro = jugadores.map((jugador, index) => ({
        jugadorId: jugador.id,
        asistencia: asistencias[index],
        goles: goles[index],
        amarillas: amarillas[index],
        rojas: rojas[index],
      }));

      console.log('📤 Enviando resultado del partido:', {
        partidoId,
        registro,
      });

      await registrarResultadoPartido(partidoId, registro);

      navigation.replace('RegistroCerrado', {
        asistencias,
        goles,
        rojas,
        amarillas,
        jugadores, // ✅ AÑADIDO AQUÍ
      });
    } catch (err) {
      console.log('❌ Error al registrar resultado:', err);
      Alert.alert('Error', 'No se pudo guardar el resultado.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <FranjasDecorativas />
      </View>

      <View style={styles.header}>
        <Icon name="fire" type="font-awesome" color="#FDBA12" size={18} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Detalles del Partido</Text>
      </View>

      <View style={styles.matchCard}>
        <Text style={styles.matchTitle}>
          {partido?.nombreEquipoA} vs {partido?.nombreEquipoB}
        </Text>
        <TouchableOpacity
          style={[styles.btnTerminar, registroCerrado && { backgroundColor: '#aaa' }]}
          onPress={handleTerminarPartido}
          disabled={registroCerrado}
        >
          <Text style={styles.btnTerminarText}>
            {registroCerrado ? 'Registro Cerrado' : 'Terminar Partido'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconosRow}>
        {['Asistencia', 'Goles', 'Roja', 'Amarilla'].map((sec, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.iconoContainer, seccion === sec && styles.iconoActivo]}
            onPress={() => setSeccion(sec)}
          >
            <Icon
              name={sec === 'Asistencia' ? 'check-circle' : sec === 'Goles' ? 'futbol-o' : 'square'}
              type="font-awesome"
              color={sec === 'Roja' ? 'red' : sec === 'Amarilla' ? 'gold' : sec === 'Goles' ? '#000' : 'green'}
              size={36}
            />
            <Text style={styles.iconLabel}>{sec}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item, index }) => (
          <View style={[
            styles.jugadorRow,
            item.equipo === 'local' ? { backgroundColor: '#e0f7ff' } : { backgroundColor: '#fff0f0' }
          ]}>
            <Text style={styles.jugadorNombre}>{item.nombre} {item.apellido} {rojas[index] > 0 ? '⚠️ Expulsado' : ''}</Text>
            {seccion === 'Asistencia' ? (
              <TouchableOpacity onPress={() => toggleAsistencia(index)}>
                <Icon
                  name={asistencias[index] ? 'check-circle' : 'circle-o'}
                  type="font-awesome"
                  color={asistencias[index] ? 'green' : '#999'}
                  size={22}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.contadorContainer}>
                <TouchableOpacity onPress={() => disminuir(
                  seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                  seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                  index
                )}>
                  <Text style={styles.operador}>−</Text>
                </TouchableOpacity>
                <Text style={styles.valorContador}>
                  {seccion === 'Goles' ? goles[index] : seccion === 'Roja' ? rojas[index] : amarillas[index]}
                </Text>
                <TouchableOpacity onPress={() => aumentar(
                  seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                  seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                  index
                )}>
                  <Text style={styles.operador}>＋</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      <ModalConfirmacion
        visible={modalVisible}
        onCancelar={() => setModalVisible(false)}
        onConfirmar={confirmarCierre}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingTop: 30,
    backgroundColor: '#000',
    zIndex: 1,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchCard: {
    backgroundColor: '#0e1b39',
    margin: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  matchTitle: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnTerminar: {
    backgroundColor: '#d80027',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 6,
  },
  btnTerminarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  iconoContainer: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    width: 70,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconoActivo: {
    borderWidth: 2,
    borderColor: '#FDBA12',
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  jugadorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jugadorNombre: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  operador: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 8,
  },
  valorContador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});