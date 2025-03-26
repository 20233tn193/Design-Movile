import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import CardListTorneos from '../../kernel/components/CardListTorneos';
import { Icon } from '@rneui/themed';

const torneos = [
  {
    logo: require('../../../assets/TorneoABC.jpg'),
    nombre: 'Torneo ABC',
    estado: 'ACTIVO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/TorneoEstatal.jpg'),
    nombre: 'Torneo Estatal',
    estado: 'FINALIZADO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/TorneoInfantil.jpg'),
    nombre: 'Torneo Infantil',
    estado: 'ACTIVO',
    fecha: '05/03/2025',
    clubes: 10,
  },
  {
    logo: require('../../../assets/TorneoVeteranos.jpg'),
    nombre: 'Torneo Veteranos',
    estado: 'FINALIZADO',
    fecha: '05/03/2025',
    clubes: 10,
  },
];

export default function TorneoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={22} />
        <Text style={styles.title}> Torneos</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar" placeholderTextColor="#999" style={styles.input} />
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Buscar</Text></TouchableOpacity>
      </View>

      <ScrollView>
        {torneos.map((torneo, i) => (
          <CardListTorneos key={i} {...torneo} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101e3d', paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
  },
  title: { color: '#FDBA12', fontSize: 20, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', marginBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#000'
  },
  button: {
    backgroundColor: '#D71A28',
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
