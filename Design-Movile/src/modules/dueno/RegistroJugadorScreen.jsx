import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import API from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

export default function RegistroJugadorScreen() {
  const route = useRoute();
  const equipoIdInicial = route.params?.equipoId || '';
  const navigation = useNavigation();
  const jugador = route.params?.jugador;

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [curp, setCurp] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [equipoId, setEquipoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaDate, setFechaDate] = useState(new Date());

  useEffect(() => {
    if (jugador) {
      setNombre(jugador.nombre || '');
      setApellido(jugador.apellido || '');
      setCurp(jugador.curp || '');
      setFechaNacimiento(jugador.fechaNacimiento || '');
      setEquipoId(jugador.equipoId || '');
      setFotoUrl(jugador.fotoUrl || '');

      if (jugador.fechaNacimiento) {
        const date = new Date(jugador.fechaNacimiento);
        const correctedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setFechaDate(correctedDate);
      }
    }
  }, [jugador]);

  const handleSeleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!resultado.canceled) {
      setFotoUrl(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  };

  const handleGuardar = async () => {
    try {
      let finalEquipoId = equipoId;

      if (!jugador && !finalEquipoId) {
        const storedEquipoId = await AsyncStorage.getItem('equipoId');
        if (!storedEquipoId) {
          Alert.alert('Error', 'No se encontró equipoId para registrar el jugador.');
          return;
        }
        finalEquipoId = storedEquipoId;
      }

      const payload = {
        equipoId: finalEquipoId,
        nombre,
        apellido,
        curp,
        fechaNacimiento,
        fotoUrl,
        eliminado: false,
      };


      if (jugador) {
        await API.put(`/jugadores/${jugador.id}`, { id: jugador.id, ...payload });
        Alert.alert('✅ Jugador actualizado correctamente');
      } else {
        await API.post('/jugadores', payload);
        Alert.alert('✅ Jugador registrado correctamente');
      }

      navigation.goBack();
    } catch (error) {
      console.error('❌ Error al guardar jugador:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar el jugador.');
    }
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={18} />
        <Text style={styles.headerText}>  {jugador ? 'Actualizar' : 'Registro'}</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      <Image
        source={{ uri: fotoUrl || 'https://placehold.co/120x140?text=Foto' }}
        style={styles.placeholderImage}
      />
      <TouchableOpacity style={styles.btnCargarImagen} onPress={handleSeleccionarImagen}>
        <Text style={styles.textoCargar}>Cargar imagen</Text>
      </TouchableOpacity>

      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Apellido" style={styles.input} value={apellido} onChangeText={setApellido} />
      <TextInput placeholder="CURP" style={styles.input} value={curp} onChangeText={setCurp} />

      <TouchableOpacity
        onPress={() => setMostrarCalendario(true)}
        style={styles.fechaSelector}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="calendar" type="font-awesome" size={16} color="#444" style={{ marginRight: 8 }} />
          <Text style={{ color: fechaNacimiento ? '#000' : '#888' }}>
            {fechaNacimiento || 'Seleccionar fecha de nacimiento'}
          </Text>
        </View>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={fechaDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            if (Platform.OS === 'android') setMostrarCalendario(false);
            if (selectedDate) {
              const iso = selectedDate.toISOString().split('T')[0];
              setFechaDate(selectedDate);
              setFechaNacimiento(iso);
            }
          }}
        />
      )}


      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgregar} onPress={handleGuardar}>
          <Text style={styles.btnTexto}>{jugador ? 'Actualizar' : 'Agregar'}</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 80 : 120,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    width: '120%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 16,
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
  placeholderImage: {
    width: 140,
    height: 160,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  btnCargarImagen: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoCargar: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#555',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnAgregar: {
    flex: 1,
    backgroundColor: '#d80027',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnEliminar: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fechaSelector: {
    backgroundColor: '#fff',
    borderColor: '#d80027',
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
});