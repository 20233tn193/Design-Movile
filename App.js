import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Pantallas
import SplashScreen from './src/screens/SplashScreen';
import BottomTabs from './src/navigation/BottomTabs'; // ✅ Ya con los íconos 🔥🏆👤📊
import TournamentDetail from './src/modules/home/TournamentDetail';
import TablaPosiciones from './src/modules/home/TablaPosiciones';
import PartidosScreen from './src/modules/home/PartidosScreen';
import GoleadoresScreen from './src/modules/home/GoleadoresScreen';
import TarjetasScreen from './src/modules/home/TarjetasScreen'; // ✅ Nueva pantalla

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Torneos" component={BottomTabs} />
        <Stack.Screen name="TournamentDetail" component={TournamentDetail} />
        <Stack.Screen name="TablaPosiciones" component={TablaPosiciones} />
        <Stack.Screen name="Partidos" component={PartidosScreen} />
        <Stack.Screen name="Goleadores" component={GoleadoresScreen} />
        <Stack.Screen name="Tarjetas" component={TarjetasScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
