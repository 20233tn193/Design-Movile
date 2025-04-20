import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🌐 Público
import SplashScreen from './src/screens/SplashScreen';
import BottomTabs from './src/navigation/BottomTabs';

// 🔐 Login
import LoginScreen from './src/screens/LoginScreen';

// ⚖️ Árbitro
import ArbitroHomeScreen from './src/modules/arbitro/ArbitroHomeScreen';
import CuentaArbitroScreen from './src/modules/arbitro/CuentaArbitroScreen';
import DetallePartidoScreen from './src/modules/arbitro/DetallePartidoScreen';
import RegistroCerradoScreen from './src/modules/arbitro/RegistroCerradoScreen';
import ModalConfirmacion from './src/modules/arbitro/ModalConfirmacion';

// 📋 Dueño
import CuentaDuenoScreen from './src/modules/dueno/CuentaDuenoScreen';
import CuentaDuenoEquipoScreen from './src/modules/dueno/CuentaDuenoEquipoScreen';
import DetalleTorneoDuenoScreen from './src/modules/dueno/DetalleTorneoDuenoScreen';
import JugadoresRegistradosDuenoScreen from './src/modules/dueno/JugadoresRegistradosDuenoScreen';
import RegistroDuenoScreen from './src/modules/dueno/RegistroDuenoScreen';
import RegistroEquipoDueno from './src/modules/dueno/RegistroEquipoDueno';
import RegistroEquipoScreen from './src/modules/dueno/RegistroEquipoScreen';
import ActualizarEquipoScreen from './src/modules/dueno/ActualizarEquipoScreen';
import ActualizarCuentaDuenoScreen from './src/modules/dueno/ActualizarCuentaDuenoScreen';
import InscripcionesDuenoScreen from './src/modules/dueno/InscripcionesDuenoScreen';
import InscripcionProcesoScreen from './src/modules/dueno/InscripcionProcesoScreen';
import InscripcionAprobadoScreen from './src/modules/dueno/InscripcionAprobadoScreen';
import ConfirmarInscripcionScreen from './src/modules/dueno/ConfirmarInscripcionScreen';
import ConfirmarPagoScreen from './src/modules/dueno/ConfirmarPagoScreen';
import PagosDuenoScreen from './src/modules/dueno/PagosDuenoScreen';
import PagoStripeScreen from './src/modules/dueno/PagoStripeScreen';
import ModalInfoCredenciales from './src/modules/dueno/ModalInfoCredenciales';
import ModalConfirmarDescargaCredenciales from './src/modules/dueno/ModalConfirmarDescargaCredenciales';
import ModalConfirmarEliminacion from './src/modules/dueno/ModalConfirmarEliminacion';
import EsterEggScreen from './src/modules/dueno/EsterEggScreen';
import RegistroJugadorScreen from './src/modules/dueno/RegistroJugadorScreen';
import DetallesJugadorScreen from './src/modules/dueno/DetallesJugadorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        {/* 🌐 Público */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />

        {/* 🔐 Login */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        {/* ⚖️ Árbitro */}
        <Stack.Screen name="ArbitroHomeScreen" component={ArbitroHomeScreen} />
        <Stack.Screen name="CuentaArbitro" component={CuentaArbitroScreen} />
        <Stack.Screen name="DetallePartido" component={DetallePartidoScreen} />
        <Stack.Screen name="RegistroCerrado" component={RegistroCerradoScreen} />
        <Stack.Screen name="ModalConfirmacion" component={ModalConfirmacion} />

        {/* ⚖️ Árbitro */}
        <Stack.Screen name="ArbitroHomeScreen" component={ArbitroHomeScreen} />
        <Stack.Screen name="CuentaArbitro" component={CuentaArbitroScreen} />
        <Stack.Screen name="DetallePartido" component={DetallePartidoScreen} />
        <Stack.Screen name="RegistroCerrado" component={RegistroCerradoScreen} />
        <Stack.Screen name="ModalConfirmacion" component={ModalConfirmacion} />

        {/* 📋 Dueño */}
        <Stack.Screen name="CuentaDuenoScreen" component={CuentaDuenoScreen} />
        <Stack.Screen name="CuentaDuenoEquipo" component={CuentaDuenoEquipoScreen} />
        <Stack.Screen name="DetalleTorneoDueno" component={DetalleTorneoDuenoScreen} />
        <Stack.Screen name="JugadoresRegistradosDueno" component={JugadoresRegistradosDuenoScreen} />
        <Stack.Screen name="RegistroDuenoScreen" component={RegistroDuenoScreen} />
        <Stack.Screen name="RegistroEquipoDueno" component={RegistroEquipoDueno} />
        <Stack.Screen name="RegistroEquipoScreen" component={RegistroEquipoScreen} />
        <Stack.Screen name="ActualizarEquipoScreen" component={ActualizarEquipoScreen} />
        <Stack.Screen name="ActualizarCuentaDueno" component={ActualizarCuentaDuenoScreen} />
        <Stack.Screen name="InscripcionesDuenoScreen" component={InscripcionesDuenoScreen} />
        <Stack.Screen name="InscripcionProceso" component={InscripcionProcesoScreen} />
        <Stack.Screen name="InscripcionAprobado" component={InscripcionAprobadoScreen} />
        <Stack.Screen name="ConfirmarInscripcion" component={ConfirmarInscripcionScreen} />
        <Stack.Screen name="ConfirmarPago" component={ConfirmarPagoScreen} />
        <Stack.Screen name="PagosDuenoScreen" component={PagosDuenoScreen} />
        <Stack.Screen name="PagoStripe" component={PagoStripeScreen} />
        <Stack.Screen name="ModalInfoCredenciales" component={ModalInfoCredenciales} />
        <Stack.Screen name="ModalConfirmarDescargaCredenciales" component={ModalConfirmarDescargaCredenciales} />
        <Stack.Screen name="ModalConfirmarEliminacion" component={ModalConfirmarEliminacion} />
        <Stack.Screen name="RegistroJugadorScreen" component={RegistroJugadorScreen} />
        <Stack.Screen name="DetallesJugadorScreen" component={DetallesJugadorScreen} />
        <Stack.Screen name="EsterEgg" component={EsterEggScreen} />
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
