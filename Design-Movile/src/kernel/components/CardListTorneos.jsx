import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardListTorneos({ logo, nombre, estado, fecha, clubes }) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.details}>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={[styles.estado, estado === 'ACTIVO' ? styles.activo : styles.finalizado]}>
            {estado}
          </Text>
          <Text style={styles.info}>Clubes: {clubes} • Fecha: {fecha}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 60,
    backgroundColor: 'transparent',
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  estado: {
    fontSize: 14,
    marginVertical: 4,
  },
  activo: {
    color: 'green',
  },
  finalizado: {
    color: 'red',
  },
  info: {
    fontSize: 12,
    color: 'gray',
  },
});
