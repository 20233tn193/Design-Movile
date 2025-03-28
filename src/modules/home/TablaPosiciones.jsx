import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';

const datos = Array(6).fill({
  equipo: 'Madrid',
  logo: require('../../../assets/Madrid.jpg'),
  pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
});

export default function TablaPosiciones() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="trophy" type="font-awesome" color="#FDBA12" size={20} />
        <Text style={styles.headerText}> Tabla de Posiciones</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { width: 100 }]}>Equipo</Text>
        <Text style={styles.columnHeader}>PJ</Text>
        <Text style={styles.columnHeader}>PG</Text>
        <Text style={styles.columnHeader}>PE</Text>
        <Text style={styles.columnHeader}>PP</Text>
        <Text style={styles.columnHeader}>GF</Text>
        <Text style={styles.columnHeader}>GC</Text>
        <Text style={styles.columnHeader}>Pts</Text>
      </View>

      <FlatList
        data={datos}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.equipo}>
              <Image source={item.logo} style={styles.logo} />
              <Text style={styles.equipoText}>{item.equipo}</Text>
            </View>
            <Text style={styles.column}>{item.pj}</Text>
            <Text style={styles.column}>{item.pg}</Text>
            <Text style={styles.column}>{item.pe}</Text>
            <Text style={styles.column}>{item.pp}</Text>
            <Text style={styles.column}>{item.gf}</Text>
            <Text style={styles.column}>{item.gc}</Text>
            <Text style={styles.column}>{item.pts}</Text>
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
  headerText: {
    color: '#FDBA12', fontWeight: 'bold', fontSize: 18, marginLeft: 10
  },
  tableHeader: {
    flexDirection: 'row', backgroundColor: '#1f2d5a', paddingVertical: 10, paddingHorizontal: 10,
    alignItems: 'center',
  },
  columnHeader: {
    color: '#FDBA12', fontWeight: 'bold', fontSize: 12, textAlign: 'center', width: 30,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 10, marginVertical: 6, padding: 10,
    borderRadius: 10, elevation: 2,
  },
  equipo: { flexDirection: 'row', alignItems: 'center', width: 100 },
  equipoText: { marginLeft: 5, fontSize: 12, fontWeight: 'bold' },
  logo: { width: 24, height: 24, borderRadius: 12 },
  column: { width: 30, textAlign: 'center', fontSize: 12 },
});
