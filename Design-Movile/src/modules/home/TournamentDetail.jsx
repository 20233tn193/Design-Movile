import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import FranjasDecorativas from '../../kernel/components/FranjasDecorativas'; // Ajusta la ruta si es diferente

const { width } = Dimensions.get('window');

export default function TournamentDetail({ route, navigation }) {
  const { nombre, torneoId, logo } = route.params;

  useEffect(() => {
    console.log("🧾 Parámetros recibidos en TournamentDetail:", route.params);
    console.log("📦 ID del torneo recibido en TournamentDetail:", torneoId);
  }, []);

  const buttons = [
    {
      label: 'Tabla de Posiciones',
      icon: require('../../../assets/Posiciones.png'),
      ruta: 'TablaPosiciones',
    },
    {
      label: 'Próximos Partidos',
      icon: require('../../../assets/ProximosPartidos.png'),
      ruta: 'Partidos',
    },
    {
      label: 'Maximos Goleadores',
      icon: require('../../../assets/Goleadores.png'),
      ruta: 'Goleadores',
    },
    {
      label: 'Tarjetas',
      icon: require('../../../assets/Tarjetas.png'),
      ruta: 'Tarjetas',
    },
  ];

  return (
    <View style={styles.container}>
      <FranjasDecorativas />

      <View style={styles.header}>
        <Image source={{ uri: logo }} style={styles.icono} />
        <Text style={styles.title}> {nombre}</Text>
      </View>

      <View style={styles.options}>
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => {
              console.log(`🧭 Navegando a ${btn.ruta} con torneoId:`, torneoId);
              navigation.navigate(btn.ruta, { torneoId });
            }}
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
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop: 30,
    zIndex: 10,
  },
  title: {
    color: '#FDBA12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icono: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
  },
  options: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#101e3d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    height: 90,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  iconoBoton: {
    width: 45,  // Tamaño aumentado
    height: 45,
    resizeMode: 'contain',
  },
});