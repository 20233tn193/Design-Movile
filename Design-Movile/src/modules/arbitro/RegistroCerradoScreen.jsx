import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas';

export default function RegistroCerrado({ route }) {
  const { jugadores = [], resultados = [] } = route.params;

  const renderSeccionEquipo = (equipoNombre, jugadoresFiltrados) => (
    <View style={styles.seccionEquipo}>
      <Text style={styles.nombreEquipo}>{equipoNombre}</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Jugador</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>✔️</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>⚽</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>🟨</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>🟥</Text>
      </View>

      {jugadoresFiltrados.map((item) => {
        const r = resultados.find(res => res.jugadorId === item.id);
        return (
          <View style={styles.row} key={item.id}>
            <Text style={[styles.text, { flex: 2 }]}>{item.nombre} {item.apellido}</Text>
            <Text style={[styles.text, { flex: 1 }]}>{r?.asistencia ? '✅' : '❌'}</Text>
            <Text style={[styles.text, { flex: 1 }]}>{r?.goles > 0 ? `⚽ ${r.goles}` : '—'}</Text>
            <Text style={[styles.text, { flex: 1 }]}>{r?.amarillas > 0 ? `🟨 ${r.amarillas}` : '—'}</Text>
            <Text style={[styles.text, { flex: 1 }]}>{r?.rojas > 0 ? '🟥' : '—'}</Text>
          </View>
        );
      })}
    </View>
  );

  const locales = jugadores.filter(j => j.equipo === 'local');
  const visitantes = jugadores.filter(j => j.equipo === 'visitante');

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}><FranjasDecorativas /></View>

      <View style={styles.header}>
        <Icon name="check-circle" type="font-awesome" color="#FDBA12" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Registro Cerrado</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderSeccionEquipo('Equipo Local', locales)}
        {renderSeccionEquipo('Equipo Visitante', visitantes)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingTop: 30,
    backgroundColor: '#000',
    zIndex: 10,
  },
  headerText: {
    color: '#FDBA12',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nombreEquipo: {
    marginTop: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0e1b39',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1f2d5a',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  columnHeader: {
    color: '#FDBA12',
    fontWeight: 'bold',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 6,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: '#333',
  },
});