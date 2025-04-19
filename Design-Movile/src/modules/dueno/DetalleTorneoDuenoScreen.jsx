import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import API from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalConfirmarInscripcion from './ModalConfirmarInscripcion';
import ModalStripeRedirect from './ModalStripeRedirect';

const { width } = Dimensions.get('window');

export default function DetalleTorneoDuenoScreen({ navigation, route }) {
  const [modalInscripcionVisible, setModalInscripcionVisible] = useState(false);
  const [modalStripeVisible, setModalStripeVisible] = useState(false);
  const [equipoId, setEquipoId] = useState(null);

  const { torneo, yaInscrito } = route.params || {};

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const duenoId = await AsyncStorage.getItem('duenoId');
        const res = await API.get(`/equipos/dueño/${duenoId}`);
        const equipos = res.data;
        if (equipos.length > 0) {
          setEquipoId(equipos[0].id);
        }
      } catch (error) {
        console.log('❌ Error al obtener equipo:', error);
      }
    };

    obtenerEquipo();
  }, []);

  const handleInscripcion = async () => {
    try {
      await API.post('/api/equipos/inscribirse', {
        equipoId,
        torneoId: torneo?.id,
      });
      Alert.alert('✅ Inscrito', 'Tu equipo fue inscrito correctamente');
      setModalStripeVisible(true);
    } catch (error) {
      console.log('❌ Error al inscribirse:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo completar la inscripción');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Detalles del Torneo</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Image source={{ uri: torneo.logoSeleccionado }} style={styles.logo} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{torneo.nombreTorneo}</Text>
            <Text style={styles.estado}>{torneo.estado}</Text>
            <Text style={styles.cardText}>Inicio: {torneo.fechaInicio}</Text>
            <Text style={styles.cardText}>{torneo.numeroEquipos} equipos</Text>
            <Text style={styles.cardText}>Inscripción: ${torneo.costo}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Información del Torneo</Text>
          <Text style={styles.infoText}>{torneo.informacion}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btnGreen, { backgroundColor: equipoId ? '#ccc' : 'green' }]}
            onPress={() => {
              if (equipoId) {
                Alert.alert(
                  'Ya inscrito',
                  'Ya estás inscrito en un torneo. No puedes inscribirte a otro.',
                  [{ text: 'OK' }]
                );
              } else {
                setModalInscripcionVisible(true);
              }
            }}
          >
            <Text style={styles.btnText}>Inscribirse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnGray}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalConfirmarInscripcion
        visible={modalInscripcionVisible}
        onClose={() => setModalInscripcionVisible(false)}
        onConfirm={async () => {
          try {
            await API.post('/api/equipos/inscribir-existente', {
              equipoId: equipoId,
              torneoId: torneo.id,
            });
            Alert.alert('✅ Inscripción exitosa', 'Tu equipo fue inscrito correctamente');
            setModalInscripcionVisible(false);
            setModalStripeVisible(true);
          } catch (error) {
            console.log('❌ Error al inscribirse:', error.response?.data || error.message);
            Alert.alert('Error', 'No se pudo completar la inscripción');
            setModalInscripcionVisible(false);
          }
        }}
        torneo={torneo.nombreTorneo}
        torneoId={torneo.id}
        navigation={navigation}
      />

      <ModalStripeRedirect
        visible={modalStripeVisible}
        onClose={() => setModalStripeVisible(false)}
        navigation={navigation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 80 : 80,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    zIndex: 3,
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
    bottom: 0,
    left: -width,
    backgroundColor: '#d80027',
    transform: [{ rotate: '10deg' }],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    paddingTop: 50,
    width: '100%',
    zIndex: 2,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#0e1b39',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  estado: {
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 2,
  },
  cardText: {
    color: '#fff',
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#0e1b39',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnGreen: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnGray: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
