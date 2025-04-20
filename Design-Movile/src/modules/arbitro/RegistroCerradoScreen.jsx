import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

const { width } = Dimensions.get('window');

export default function RegistroCerrado({ route }) {
  const {
    asistencias = [],
    goles = [],
    rojas = [],
    amarillas = [],
    jugadores = [],
  } = route.params;

  const renderSeccion = (titulo, icono, color, valores) => {
    return (
      <View style={styles.seccionContainer}>
        <View style={styles.seccionHeader}>
          <Icon name={icono} type="font-awesome" color={color} size={20} style={{ marginRight: 8 }} />
          <Text style={styles.seccionTitle}>{titulo}</Text>
        </View>
        <FlatList
          data={jugadores}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => {
            let valorVisual = '—';

            if (titulo === 'Asistencias') {
              valorVisual = asistencias[index] ? '✅' : '❌';
            } else if (titulo === 'Goles') {
              valorVisual = goles[index] > 0 ? `⚽ ${goles[index]}` : '—';
            } else if (titulo === 'Tarjetas Rojas') {
              valorVisual = rojas[index] > 0 ? '🟥' : '—';
            } else if (titulo === 'Tarjetas Amarillas') {
              valorVisual = amarillas[index] > 0 ? `🟨 ${amarillas[index]}` : '—';
            }

            return (
              <View style={styles.itemRow}>
                <Text style={styles.itemNombre}>{item.nombre} {item.apellido}</Text>
                <Text style={styles.itemValor}>{valorVisual}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <FranjasDecorativas />
      </View>

      <View style={styles.header}>
        <Icon name="check-circle" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro Cerrado</Text>
      </View>

      {renderSeccion('Asistencias', 'check-circle', 'green', asistencias)}
      {renderSeccion('Goles', 'futbol-o', '#000', goles)}
      {renderSeccion('Tarjetas Rojas', 'square', 'red', rojas)}
      {renderSeccion('Tarjetas Amarillas', 'square', 'gold', amarillas)}
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
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seccionContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  seccionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0e1b39',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemNombre: {
    fontSize: 14,
    color: '#333',
  },
  itemValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});