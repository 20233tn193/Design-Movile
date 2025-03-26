import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';

const datos = Array(6).fill({
  jugador: 'Hanna Perez',
  equipo: 'Madrid',
  amarillas: 1,
  rojas: 2,
});

export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="credit-card" type="font-awesome-5" color="#FDBA12" size={20} />
        <Text style={styles.title}> Tarjetas</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { width: 120 }]}>Nombre</Text>
        <Text style={[styles.columnHeader, { width: 80 }]}>Equipo</Text>
        <View style={styles.cardIcons}>
          <Icon name="square" type="font-awesome" color="yellow" size={16} />
          <Icon name="square" type="font-awesome" color="red" size={16} style={{ marginLeft: 8 }} />
        </View>
      </View>

      <FlatList
        data={datos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.text, { width: 120 }]}>{item.jugador}</Text>
            <Text style={[styles.text, { width: 80 }]}>{item.equipo}</Text>
            <Text style={styles.text}>{item.amarillas}</Text>
            <Text style={styles.text}>{item.rojas}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingTop: 0 },
  header: {
    flexDirection: 'row', backgroundColor: '#000', padding: 10, alignItems: 'center',
  },
  title: {
    color: '#FDBA12', fontWeight: 'bold', fontSize: 18, marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1f2d5a', padding: 10,
  },
  columnHeader: {
    color: '#FDBA12', fontWeight: 'bold', fontSize: 13,
  },
  cardIcons: {
    flexDirection: 'row', alignItems: 'center',
    marginLeft: 'auto', marginRight: 15,
  },
  row: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginHorizontal: 10, marginTop: 6, borderRadius: 10,
    padding: 10, elevation: 2, alignItems: 'center',
  },
  text: {
    fontSize: 13, marginRight: 20, color: '#333',
  },
});
