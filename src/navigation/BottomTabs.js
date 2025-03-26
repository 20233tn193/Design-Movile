import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TorneoScreen from '../modules/home/TorneoScreen';
import PartidosScreen from '../modules/home/PartidosScreen';
import { View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

// Placeholders
function PerfilScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Pantalla de Perfil</Text>
    </View>
  );
}

function EstadisticasScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Estadísticas generales</Text>
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FDBA12',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Partidos"
        component={PartidosScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="fire" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Torneos"
        component={TorneoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={EstadisticasScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
