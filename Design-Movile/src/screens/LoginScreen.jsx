import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handlePress = (rol) => {
    switch (rol) {
      case 'publico':
        navigation.replace('Torneos');
        break;
      case 'arbitro':
        navigation.replace('LoginArbitro');
        break;
      case 'dueno':
        navigation.replace('LoginDueno');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona tu Rol</Text>

        <TouchableOpacity style={styles.button} onPress={() => handlePress('publico')}>
          <Text style={styles.buttonText}>Público</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress('arbitro')}>
          <Text style={styles.buttonText}>Árbitro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress('dueno')}>
          <Text style={styles.buttonText}>Dueño</Text>
        </TouchableOpacity>

        <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E2F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 50,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ECF0F1',
    fontSize: 18,
  },
  logo: {
    marginTop: 40,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
