import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ModalConfirmacion from './ModalConfirmacion';

const { width } = Dimensions.get('window');

const jugadores = ['Hanna Perez', 'Hanna Perez', 'Hanna Perez', 'Hanna Perez', 'Hanna Perez'];

export default function DetallePartidoScreen() {
  const [seccion, setSeccion] = useState('Asistencia');
  const [asistencias, setAsistencias] = useState([true, true, false, false, false]);
  const [goles, setGoles] = useState([0, 0, 0, 0, 0]);
  const [rojas, setRojas] = useState([0, 0, 0, 0, 0]);
  const [amarillas, setAmarillas] = useState([0, 0, 0, 0, 0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [registroCerrado, setRegistroCerrado] = useState(false);

  const navigation = useNavigation();

  const aumentar = (arr, setArr, i) => {
    if (registroCerrado) return;
    const nuevo = [...arr];
    nuevo[i]++;
    setArr(nuevo);
  };

  const disminuir = (arr, setArr, i) => {
    if (registroCerrado) return;
    const nuevo = [...arr];
    if (nuevo[i] > 0) nuevo[i]--;
    setArr(nuevo);
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

  const confirmarCierre = () => {
    setModalVisible(false);
    setRegistroCerrado(true);
    // Podrías enviar los datos si lo deseas aquí
  };

  return (
    <View style={styles.container}>
      {/* Triángulo superior y franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="fire" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Detalles del Partido</Text>
      </View>

      {/* Buscador */}
      <View style={styles.buscadorContainer}>
        <TextInput placeholder="Buscar" placeholderTextColor="#555" style={styles.inputBuscar} />
        <TouchableOpacity style={styles.btnBuscar}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Card de partido */}
      <View style={styles.matchCard}>
        <Text style={styles.matchTitle}>Juventus vs Madrid</Text>
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

      {/* Botones de secciones */}
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
              color={
                sec === 'Roja' ? 'red' : sec === 'Amarilla' ? 'gold' : sec === 'Goles' ? '#000' : 'green'
              }
              size={36}
            />
            <Text style={styles.iconLabel}>{sec}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de jugadores */}
      <View style={styles.recuadroJugadores}>
        <FlatList
          data={jugadores}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item, index }) => (
            <View style={styles.jugadorItem}>
              <Text style={styles.jugadorNombre}>{item}</Text>
              {seccion === 'Asistencia' && (
                <TouchableOpacity onPress={() => toggleAsistencia(index)}>
                  <Icon
                    name={asistencias[index] ? 'check-circle' : 'circle-o'}
                    type="font-awesome"
                    color={asistencias[index] ? 'green' : '#999'}
                    size={20}
                  />
                </TouchableOpacity>
              )}
              {['Goles', 'Roja', 'Amarilla'].includes(seccion) && (
                <View style={styles.contadorContainer}>
                  <TouchableOpacity onPress={() => disminuir(
                    seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                    seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                    index
                  )}>
                    <Text style={styles.operador}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.valorContador}>
                    {seccion === 'Goles' ? goles[index] : seccion === 'Roja' ? rojas[index] : amarillas[index]}
                  </Text>
                  <TouchableOpacity onPress={() => aumentar(
                    seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                    seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                    index
                  )}>
                    <Text style={styles.operador}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* Modal de confirmación */}
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
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buscadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    zIndex: 20,
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
  matchCard: {
    backgroundColor: '#0e1b39',
    margin: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    zIndex: 10,
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
  },
  iconoContainer: {
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 70,
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
  recuadroJugadores: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jugadorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  jugadorNombre: {
    fontSize: 14,
    color: '#333',
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operador: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#000',
  },
  valorContador: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  triangleTopRed: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 70,
    borderRightWidth: width * 2,
    borderTopColor: '#d80027',
    borderRightColor: 'transparent',
    zIndex: -1,
  },
  franja: {
    position: 'absolute',
    width: width * 2,
    height: 40,
    zIndex: -1,
  },
  franjaNegraTop: {
    top: 80,
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
