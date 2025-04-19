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
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

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

        const response = await axios.get(
          `http://192.168.1.65:8080/api/arbitros/usuario/${usuarioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("🎯 Datos del árbitro recibidos:", response.data);
        setArbitro(response.data);
      } catch (error) {
        console.log('Error al cargar árbitro:', error);
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
            navigation.replace('LoginScreen');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <FranjasDecorativas />
        <ActivityIndicator size="large" color="#d80027" style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>¡Bienvenido, {arbitro?.nombre}!</Text>

        <View style={styles.profileContainer}>
          <Image
            source={
              arbitro?.fotoUrl && arbitro.fotoUrl.startsWith('data:image')
                ? { uri: arbitro.fotoUrl }
                : require('../../../assets/arbitro.jpg')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.rolBadge}>
            <Text style={styles.rolText}>Árbitro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.name}>{arbitro?.nombre} {arbitro?.apellido}</Text>
          <Text style={styles.text}>{arbitro?.correo}</Text>
          <Text style={styles.text}>{arbitro?.celular || 'Sin número registrado'}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Image
          source={require('../../../assets/manhattan_logo.jpg')}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    zIndex: 1,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    color: '#001F4E',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  rolBadge: {
    backgroundColor: '#0e1b39',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#d80027',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
