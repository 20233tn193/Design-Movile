import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default function DetallesJugadorScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const jugador = route.params?.jugador;

  const handleEliminar = () => {
    Alert.alert('Confirmar', '¿Estás seguro de eliminar este jugador?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive',
        onPress: async () => {
          try {
            await API.delete(`/jugadores/${jugador.id}`);
            Alert.alert('Jugador eliminado correctamente');
            navigation.goBack();
          } catch (error) {
            console.error('❌ Error al eliminar jugador:', error);
            Alert.alert('Error', 'No se pudo eliminar el jugador.');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  Detalles del Jugador</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Card del jugador */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            source={{ uri: jugador.fotoUrl || 'https://placehold.co/100x100?text=Foto' }}
            style={styles.foto}
          />
          <View style={styles.etiqueta}>
            <Text style={styles.etiquetaTexto}>Jugador</Text>
          </View>
        </View>

        <Text style={styles.nombre}><Text style={{ fontWeight: 'bold' }}>{jugador.nombre} {jugador.apellido}</Text></Text>
        <Text style={styles.dato}>CURP: {jugador.curp}</Text>
        <Text style={styles.dato}>Fecha de nacimiento: {jugador.fechaNacimiento}</Text>

        <TouchableOpacity style={styles.btnEditar} onPress={() => navigation.navigate('RegistroJugadorScreen', { jugador })}>
          <Icon name="pencil" type="font-awesome" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnEliminar} onPress={handleEliminar}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnTexto}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* Logo inferior */}
      <Image
        source={require('../../../assets/ManhattanLogoRojo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
  },
  franja: {
    position: 'absolute',
    width: width * 2.1,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 70,
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
  card: {
    
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    marginTop: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 14,
  },
  etiqueta: {
    backgroundColor: '#0e1b39',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  etiquetaTexto: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 25,
  },
  nombre: {
    marginTop: 16,
    fontSize: 18,
  },
  dato: {
    fontSize: 15,
    color: '#333',
    marginTop: 5,
  },
  btnEditar: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 8,
    
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    gap: 10,
    marginTop: 30,
  },
  btnEliminar: {
    flex: 1,
    backgroundColor: '#d80027',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnRegresar: {
    flex: 1,
    backgroundColor: '#555',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 180,
    height: 60,
    marginTop: 120,
  },
});