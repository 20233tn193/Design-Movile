import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';
import { obtenerArbitroPorUsuarioId } from '../../api/api';

const { width } = Dimensions.get('window');

export default function CuentaArbitroScreen() {
  const navigation = useNavigation();
  const [arbitro, setArbitro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuarioId = await AsyncStorage.getItem('usuarioId');
        const token = await AsyncStorage.getItem('token');

        if (!usuarioId || !token) {
          Alert.alert('Error', 'No hay sesión activa');
          return;
        }

        const data = await obtenerArbitroPorUsuarioId(usuarioId);
        setArbitro(data);
      } catch (error) {
        console.log('❌ Error al cargar árbitro:', error.response?.data || error.message);
        Alert.alert('Error', 'No se pudo obtener la información del árbitro');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const cerrarSesion = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, salir',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace('Main');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <FranjasDecorativas />
        <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 50, zIndex: 2 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.foreground}>
        <View style={styles.header}>
          <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
          <Text style={styles.headerText}>Cuenta del Árbitro</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.welcome}>¡Hola, {arbitro?.nombre || 'Árbitro'}!</Text>

          <View style={styles.profileContainer}>
            <Image
              source={
                arbitro?.fotoUrl && arbitro.fotoUrl.startsWith('data:image')
                  ? { uri: arbitro.fotoUrl }
                  : require('../../../assets/arbitro.jpg')
              }
              style={styles.profileImage}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{arbitro?.nombre} {arbitro?.apellido}</Text>
              <Text style={styles.email}>{arbitro?.correo}</Text>
            </View>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>ÁRBITRO</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <Image
            source={require('../../../assets/ManhattanLogoRojo.png')}
            style={styles.logo}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    
  },
  foreground: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    marginTop: 80,
    paddingBottom: 60,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F4E',
    marginBottom: 25,
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 40,
    borderWidth: 2,
    left: 10,
    borderColor: '#001F4E',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F4E',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#333',
  },
  badge: {
    backgroundColor: '#0e1b39',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 25,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: '#d80027',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});
