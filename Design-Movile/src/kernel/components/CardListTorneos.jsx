import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardListTorneos({ logo, nombre, estado, fecha, clubes }) {
  return (


    <View style={styles.card}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.details}>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text
            style={[
              styles.estado,
              estado.toUpperCase().trim() === 'ABIERTO'
                ? styles.abierto
                : estado.toUpperCase().trim() === 'FINALIZADO'
                  ? styles.finalizado
                  : estado.toUpperCase().trim() === 'CERRADO'
                    ? styles.cerrado
                    : estado.toUpperCase().trim() === 'EN CURSO'
                      ? styles.enCurso
                      : styles.otros,
            ]}
          >
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
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 60,
    backgroundColor: 'transparent',
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  estado: {
    fontSize: 14,
    marginVertical: 4,
  },
  abierto: {
    color: 'green',
    fontWeight: 'bold',
  },
  finalizado: {
    color: 'red',
    fontWeight: 'bold',
  },
  cerrado: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  enCurso: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  otros: {
    color: '#FDBA12',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 15,
    color: 'gray',
  },
});
