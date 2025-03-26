import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function TournamentDetail({ route, navigation }) {
  const { nombre } = route.params;

  const buttons = [
    { label: 'Tabla de Posiciones', icon: require('../../../assets/Posiciones.jpg'), ruta: 'TablaPosiciones' },
    { label: 'Próximos Partidos', icon: require('../../../assets/ProximosPartidos.jpg'), ruta: 'Partidos' },
    { label: 'Maximos Goleadores', icon: require('../../../assets/Goleadores.jpg'), ruta: 'Goleadores' },
    { label: 'Tarjetas', icon: require('../../../assets/Tarjetas.jpg'), ruta: 'Tarjetas' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/TorneoABC.jpg')}
          style={styles.icono}
        />
        <Text style={styles.title}> {nombre}</Text>
      </View>
      <View style={styles.options}>
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => navigation.navigate(btn.ruta)}
          >
            <Image source={btn.icon} style={styles.iconoBoton} />
            <Text style={styles.text}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  title: { color: '#FDBA12', fontSize: 20, fontWeight: 'bold' },
  icono: { width: 30, height: 30, marginRight: 10 },
  options: { padding: 20 },
  card: {
    backgroundColor: '#101e3d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: { color: '#fff', fontSize: 16, marginLeft: 15, fontWeight: 'bold' },
  iconoBoton: { width: 24, height: 24 },
});
