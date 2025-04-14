import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import CardListTorneos from '../../kernel/components/CardListTorneos';
import { Icon } from '@rneui/themed';
import API from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

const { width } = Dimensions.get('window');

export default function TorneoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    const obtenerTorneos = async () => {
      try {
        const response = await API.get('/torneos');
        setTorneos(response.data);
      } catch (error) {
        console.log('Error cargando torneos:', error);
      }
    };

    obtenerTorneos();
  }, []);

  const torneosFiltrados = torneos.filter((t) =>
    ((t.nombreTorneo || '') + ' ' + (t.estado || ''))
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.headerFull}>
        <Icon name="chart-bar" type="font-awesome-5" color="#FDBA12" size={28} />
        <Text style={styles.title}> Torneos</Text>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar"
            placeholderTextColor="#666"
            style={styles.input}
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {torneosFiltrados.map((torneo, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cardTorneo}
            onPress={() =>
              navigation.navigate('Torneos', {
                screen: 'TournamentDetail',
                params: {
                  torneoId: torneo._id,
                  nombre: torneo.nombreTorneo,
                  logo: torneo.logoSeleccionado,
                },
              })
            }
          >
            <CardListTorneos
              logo={{ uri: torneo.logoSeleccionado }}
              nombre={torneo.nombreTorneo}
              estado={torneo.estado}
              fecha={torneo.fechaInicio}
              clubes={torneo.numeroEquipos}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
    overflow: 'hidden',
  },
  headerFull: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop: 50,
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#d80027',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTorneo: {
    backgroundColor: '#0e1b39',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 14,
    padding: 10,
  },
});
