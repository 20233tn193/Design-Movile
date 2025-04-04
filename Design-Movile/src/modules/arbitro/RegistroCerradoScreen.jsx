import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ModalConfirmacion from './ModalConfirmacion';

const { width } = Dimensions.get('window');

const jugadores = [
  'Hanna Perez',
  'Hanna Perez',
  'Hanna Perez',
  'Hanna Perez',
  'Hanna Perez',
];

export default function DetallePartidoScreen() {
  const [seccion, setSeccion] = useState('Asistencia');
  const [asistencias, setAsistencias] = useState([true, true, false, false, false]);
  const [goles, setGoles] = useState([0, 0, 0, 0, 0]);
  const [rojas, setRojas] = useState([0, 0, 0, 0, 0]);
  const [amarillas, setAmarillas] = useState([0, 0, 0, 0, 0]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const aumentar = (arr, setArr, i) => {
    const nuevo = [...arr];
    nuevo[i]++;
    setArr(nuevo);
  };

  const disminuir = (arr, setArr, i) => {
    const nuevo = [...arr];
    if (nuevo[i] > 0) nuevo[i]--;
    setArr(nuevo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      <View style={styles.header}>
        <Icon name="fire" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Detalles del Partido</Text>
      </View>

      <View style={[styles.buscadorContainer, { zIndex: 20 }]}>
        <TextInput placeholder="Buscar" placeholderTextColor="#555" style={styles.inputBuscar} />
        <TouchableOpacity style={styles.btnBuscar}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.matchCard}>
        <Text style={styles.matchTitle}>Juventus vs Madrid</Text>
        <View style={styles.btnCerrado}>
          <Text style={styles.btnCerradoText}>Registro Cerrado</Text>
        </View>
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

      <View style={styles.recuadroJugadores}>
        <FlatList
          data={jugadores}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.jugadorItem}>
              <Text style={styles.jugadorNombre}>{item}</Text>
              {seccion === 'Asistencia' && (
                <Icon
                  name={asistencias[index] ? 'check-circle' : 'circle-o'}
                  type="font-awesome"
                  color={asistencias[index] ? 'green' : '#999'}
                  size={20}
                />
              )}
              {['Goles', 'Roja', 'Amarilla'].includes(seccion) && (
                <View style={styles.contadorContainer}>
                  <TouchableOpacity
                    onPress={() => disminuir(
                      seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                      seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                      index
                    )}
                  >
                    <Text style={styles.operador}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.valorContador}>
                    {seccion === 'Goles' ? goles[index] : seccion === 'Roja' ? rojas[index] : amarillas[index]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => aumentar(
                      seccion === 'Goles' ? goles : seccion === 'Roja' ? rojas : amarillas,
                      seccion === 'Goles' ? setGoles : seccion === 'Roja' ? setRojas : setAmarillas,
                      index
                    )}
                  >
                    <Text style={styles.operador}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ArbitroHome')}>
          <Image source={require('../../../assets/ProximosPartidos.jpg')} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('DetallePartido')}>
          <Icon name="trophy" type="font-awesome" color="white" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('CuentaArbitro')}>
          <Icon name="user" type="font-awesome" color="white" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('EstadisticasArbitro')}>
          <Icon name="bar-chart" type="font-awesome" color="white" size={22} />
        </TouchableOpacity>
      </View>

      <ModalConfirmacion
        visible={modalVisible}
        onCancelar={() => setModalVisible(false)}
        onConfirmar={() => {
          setModalVisible(false);
          navigation.navigate('RegistroCerrado', {
            asistencias,
            goles,
            rojas,
            amarillas
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#000', padding: 12, flexDirection: 'row', alignItems: 'center', zIndex: 10 },
  headerText: { color: '#FDBA12', fontSize: 18, fontWeight: 'bold' },
  buscadorContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: -10, backgroundColor: '#fff', padding: 5, borderRadius: 10, zIndex: 20 },
  inputBuscar: { flex: 1, backgroundColor: '#f1f1f1', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: '#ccc' },
  btnBuscar: { backgroundColor: '#d80027', marginLeft: 10, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  btnBuscarText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  matchCard: { backgroundColor: '#0e1b39', margin: 15, borderRadius: 10, padding: 10, alignItems: 'center' },
  matchTitle: { color: '#FDBA12', fontWeight: 'bold', fontSize: 16 },
  btnCerrado: { backgroundColor: '#ccc', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginTop: 6 },
  btnCerradoText: { color: '#333', fontWeight: 'bold', fontSize: 12 },
  iconosRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  iconoContainer: { backgroundColor: '#e8e8e8', alignItems: 'center', padding: 10, borderRadius: 10, width: 70 },
  iconLabel: { fontSize: 12, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  recuadroJugadores: { backgroundColor: '#fff', borderRadius: 12, margin: 10, padding: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  jugadorItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  jugadorNombre: { fontSize: 14, color: '#333' },
  contadorContainer: { flexDirection: 'row', alignItems: 'center' },
  operador: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 10, color: '#000' },
  valorContador: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  bottomTabs: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, backgroundColor: '#1a1a1a', borderTopWidth: 1, borderTopColor: '#333', position: 'absolute', bottom: 0, width: '100%' },
  tabButton: { padding: 8 },
  tabIcon: { width: 24, height: 24, resizeMode: 'contain' },
  triangleTopRed: { position: 'absolute', top: 10, left: 0, width: 0, height: 0, borderTopWidth: 70, borderRightWidth: width * 2, borderTopColor: '#d80027', borderRightColor: 'transparent', zIndex: 1 },
  franja: { position: 'absolute', width: width * 2, height: 40 },
  franjaNegraTop: { top: 80, left: -width, backgroundColor: '#1a1a1a', transform: [{ rotate: '-10deg' }] },
  franjaGrisTop: { top: 90, left: -width, backgroundColor: '#e6e6e6', transform: [{ rotate: '-10deg' }] },
});
