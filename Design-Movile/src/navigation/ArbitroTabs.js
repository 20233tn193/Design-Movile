import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import ArbitroHomeScreen from '../modules/arbitro/ArbitroHomeScreen';
import CuentaArbitroScreen from '../modules/arbitro/CuentaArbitroScreen';

const Tab = createBottomTabNavigator();

export default function ArbitroTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FDBA12',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Asignados"
        component={ArbitroHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="fire" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={CuentaArbitroScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
