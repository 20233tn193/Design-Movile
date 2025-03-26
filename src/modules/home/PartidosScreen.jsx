import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';

const partidos = [
  {
    local: { nombre: 'Madrid', logo: require('../../../assets/Madrid.jpg') },
    visitante: { nombre: 'Juventus', logo: require('../../../assets/Juventus.jpg') },
    resultado: '1 : 0',
    cancha: 'Los Tamales - Verde',
    hora: '10:00 am',
    arbitro: 'Juan Chavez'
  },
  {
    local: { nombre: 'Paris', logo: require('../../../assets/Paris.jpg') },
    visitante: { nombre: 'Barcelona', logo: require('../../../assets/Barcelona.jpg') },
    resultado: '2 : 1',
    cancha: 'Los Tamales - Rojo',
    hora: '12:00 pm',
    arbitro: 'Juan Chavez'
  },
];

export default function PartidosScreen() {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="fire" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Partidos</Text>
      </View>

      {/* Jornada */}
      <View style={styles.jornada}>
        <Text style={styles.jornadaText}>Jornada 1  -  Domingo 23/03/2025</Text>
      </View>

      <FlatList
        data={partidos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => (
          <View style={[styles.card, index === 0 && styles.cardDestacado]}>
            <View style={styles.row}>
              <Image source={item.local.logo} style={styles.logo} />
              <Text style={styles.resultado}>{item.resultado}</Text>
              <Image source={item.visitante.logo} style={styles.logo} />
            </View>
            <View style={styles.nombres}>
              <Text style={styles.nombreEquipo}>{item.local.nombre}</Text>
              <Text style={styles.nombreEquipo}>{item.visitante.nombre}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="map-marker-alt" type="font-awesome-5" color="red" size={14} />
              <Text style={styles.infoText}>{item.cancha} - {item.hora}</Text>
            </View>
            <Text style={styles.arbitro}>{item.arbitro}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  jornada: {
    backgroundColor: '#1f2d5a',
    padding: 8,
    alignItems: 'center',
  },
  jornadaText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  cardDestacado: {
    borderColor: '#007AFF',
    borderWidth: 1.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  nombreEquipo: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#333',
  },
  arbitro: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
    color: '#555',
  },
});
