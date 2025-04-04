import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/logo.jpg')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>GTF</Text>
        <Text style={styles.subtitle}>
          Sistema de Gestión{"\n"}de Torneos de Fútbol
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d80027',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
