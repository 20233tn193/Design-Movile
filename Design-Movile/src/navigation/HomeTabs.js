import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';

import TorneoScreen from '../modules/home/TorneoScreen';
import TournamentDetail from '../modules/home/TournamentDetail';
import TablaPosiciones from '../modules/home/TablaPosiciones';
import PartidosScreen from '../modules/home/PartidosScreen';
import GoleadoresScreen from '../modules/home/GoleadoresScreen';
import TarjetasScreen from '../modules/home/TarjetasScreen';
import Estadisticas from '../modules/home/Estadisticas';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function TorneosStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="TorneosInicio" component={TorneoScreen} />
      <HomeStack.Screen name="TournamentDetail" component={TournamentDetail} />
      <HomeStack.Screen name="TablaPosiciones" component={TablaPosiciones} />
      <HomeStack.Screen name="Partidos" component={PartidosScreen} />
      <HomeStack.Screen name="Goleadores" component={GoleadoresScreen} />
      <HomeStack.Screen name="Tarjetas" component={TarjetasScreen} />
    </HomeStack.Navigator>
  );
}

function PerfilRedirect({ navigation }) {
  useEffect(() => {
    navigation.replace('LoginScreen');
  }, []);

  return null;
}

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FDBA12',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Torneos"
        component={TorneosStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" type="font-awesome" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilRedirect}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" type="font-awesome" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={Estadisticas}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart" type="font-awesome" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
