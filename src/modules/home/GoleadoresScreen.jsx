import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Icon } from '@rneui/themed';

const datos = Array(5).fill({
  nombre: 'Hanna Perez',
  equipo: 'Madrid',
  goles: 23,
  logo: require('../../../assets/Madrid.jpg'),
});

export default function GoleadoresScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="award" type="font-awesome-5" color="#FDBA12" size={20} />
        <Text style={styles.title}> Goleadores</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.column}>Nombre</Text>
        <Text style={styles.column}>Equipo</Text>
        <Text style={styles.column}>Goles</Text>
      </View>

      <FlatList
        data={datos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.nombre}</Text>
            <View style={styles.equipo}>
              <Image source={item.logo} style={styles.logo} />
              <Text style={styles.equipoText}>{item.equipo}</Text>
            </View>
            <Text style={styles.column}>{item.goles}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 0 },
  header: { flexDirection: 'row', padding: 10, backgroundColor: '#000' },
  title: { color: '#FDBA12', fontWeight: 'bold', fontSize: 18 },
  tableHeader: {
    flexDirection: 'row', paddingVertical: 8, backgroundColor: '#eee',
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-around', marginVertical: 5, padding: 10,
    backgroundColor: '#f9f9f9', marginHorizontal: 10,
    borderRadius: 10, elevation: 2
  },
  column: { fontSize: 12, width: 90, textAlign: 'center' },
  equipo: { flexDirection: 'row', alignItems: 'center' },
  equipoText: { marginLeft: 5, fontSize: 12 },
  logo: { width: 20, height: 20, borderRadius: 10 },
});
