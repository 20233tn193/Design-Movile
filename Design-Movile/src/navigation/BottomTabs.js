import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TorneoScreen from '../modules/home/TorneoScreen';
import PartidosScreen from '../modules/home/PartidosScreen';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

// 👉 Al presionar el tab, redirige al LoginArbitro
function PerfilScreen({ navigation }) {
  React.useEffect(() => {
    navigation.replace('LoginArbitro');
  }, []);

  return null;
}

function EstadisticasScreen() {
  return (
    <></> // Puedes reemplazar esto con una futura pantalla real
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
        name="Perfil" // cambiado para mayor claridad
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
