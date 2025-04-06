import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TorneoScreen from '../modules/home/TorneoScreen';
import Estadisticas from '../modules/home/Estadisticas';
import { Icon } from '@rneui/themed';

function PerfilScreen({ navigation }) {
  React.useEffect(() => {
    navigation.replace('Login'); // 🔁 Aquí corregido
  }, []);

  return null;
}

const Tab = createBottomTabNavigator();

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
          height: 60,
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
        component={Estadisticas}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
