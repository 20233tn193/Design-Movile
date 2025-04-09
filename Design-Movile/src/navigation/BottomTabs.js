import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TorneoScreen from '../modules/home/TorneoScreen';
import Estadisticas from '../modules/home/Estadisticas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import CuentaDuenoScreen from '../modules/dueno/CuentaDuenoScreen';


function PerfilScreenWrapper() {
  const [pantalla, setPantalla] = React.useState(null);

  React.useEffect(() => {
    const verificar = async () => {
      const token = await AsyncStorage.getItem('token');
      const rol = await AsyncStorage.getItem('rol');
      const duenoId = await AsyncStorage.getItem('duenoId');
      const arbitroId = await AsyncStorage.getItem('arbitroId');
    
      if (!token || !rol) {
        const LoginScreen = require('../screens/LoginScreen').default;
        setPantalla(<LoginScreen />);
        return;
      }
    
      if (rol === 'DUENO' && duenoId) {
        const CuentaDuenoScreen = require('../modules/dueno/CuentaDuenoScreen').default;
        setPantalla(<CuentaDuenoScreen />);
      } else if (rol === 'ARBITRO' && arbitroId) {
        const CuentaArbitroScreen = require('../modules/arbitro/CuentaArbitroScreen').default;
        setPantalla(<CuentaArbitroScreen />);
      } else {
        console.warn('⚠️ Token presente pero sin ID válido, eliminando sesión');
        await AsyncStorage.multiRemove(['token', 'rol', 'duenoId', 'arbitroId']);
        const LoginScreen = require('../screens/LoginScreen').default;
        setPantalla(<LoginScreen />);
      }
    };

    verificar();
  }, []);

  return pantalla || (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#001F4E" />
    </View>
  );
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
        component={TorneoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" type="font-awesome" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreenWrapper}
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