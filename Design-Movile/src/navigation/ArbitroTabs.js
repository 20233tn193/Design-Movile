import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';

import ArbitroHomeScreen from '../modules/arbitro/ArbitroHomeScreen';
import CuentaArbitroScreen from '../modules/arbitro/CuentaArbitroScreen';
import DetallePartidoScreen from '../modules/arbitro/DetallePartidoScreen';
import RegistroCerradoScreen from '../modules/arbitro/RegistroCerradoScreen';
import ModalConfirmacion from '../modules/arbitro/ModalConfirmacion';
import Estadisticas from '../modules/home/Estadisticas';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PartidosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ArbitroHomeScreen" component={ArbitroHomeScreen} />
      <Stack.Screen name="DetallePartido" component={DetallePartidoScreen} />
      <Stack.Screen name="RegistroCerrado" component={RegistroCerradoScreen} />
      <Stack.Screen name="ModalConfirmacion" component={ModalConfirmacion} />
    </Stack.Navigator>
  );
}

export default function ArbitroTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={PartidosStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" type="font-awesome" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={CuentaArbitroScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" type="font-awesome" color={color} size={24} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
