import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import API from '../../api/api';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas'; // Ajusta la ruta según tu estructura

const { width } = Dimensions.get('window');

export default function TablaPosiciones({ route }) {
  const { torneoId } = route.params;
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    console.log('📦 ID del torneo recibido:', torneoId);
    const cargarTabla = async () => {
      try {
        const response = await API.get(`/estadisticas/tabla-posiciones/${torneoId}`);
        setTabla(response.data);
      } catch (error) {
        console.log('Error al obtener tabla de posiciones:', error);
      }
    };

    cargarTabla();
  }, [torneoId]);

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.header}>
        <Image source={require('../../../assets/TablaPosiciones .png')} style={styles.icono} />
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
        data={tabla}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.equipo}>
              <Image source={{ uri: item.logoUrl }} style={styles.logo} />
              <Text style={styles.equipoText}>{item.nombreEquipo}</Text>
            </View>
            <Text style={styles.column}>{item.partidosJugados}</Text>
            <Text style={styles.column}>{item.ganados}</Text>
            <Text style={styles.column}>
              {item.partidosJugados - item.ganados - item.perdidos}
            </Text>
            <Text style={styles.column}>{item.perdidos}</Text>
            <Text style={styles.column}>{item.golesFavor}</Text>
            <Text style={styles.column}>{item.golesContra}</Text>
            <Text style={styles.column}>{item.puntos}</Text>
          </View>
        )}
      />
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    paddingTop: 30,
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1f2d5a',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    width: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  equipoText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  column: {
    width: 30,
    textAlign: 'center',
    fontSize: 12,
  },
  icono: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
