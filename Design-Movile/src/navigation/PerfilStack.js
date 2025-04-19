import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 📋 Importaciones de pantallas del Dueño
import CuentaDuenoScreen from '../modules/dueno/CuentaDuenoScreen';
import CuentaDuenoEquipoScreen from '../modules/dueno/CuentaDuenoEquipoScreen';
import DetalleTorneoDuenoScreen from '../modules/dueno/DetalleTorneoDuenoScreen';
import JugadoresRegistradosDuenoScreen from '../modules/dueno/JugadoresRegistradosDuenoScreen';
import RegistroDuenoScreen from '../modules/dueno/RegistroDuenoScreen';
import RegistroEquipoDueno from '../modules/dueno/RegistroEquipoDueno';
import RegistroEquipoScreen from '../modules/dueno/RegistroEquipoScreen';
import ActualizarEquipoScreen from '../modules/dueno/ActualizarEquipoScreen';
import ActualizarCuentaDuenoScreen from '../modules/dueno/ActualizarCuentaDuenoScreen';
import InscripcionesDuenoScreen from '../modules/dueno/InscripcionesDuenoScreen';
import InscripcionProcesoScreen from '../modules/dueno/InscripcionProcesoScreen';
import InscripcionAprobadoScreen from '../modules/dueno/InscripcionAprobadoScreen';
import ConfirmarInscripcionScreen from '../modules/dueno/ConfirmarInscripcionScreen';
import ConfirmarPagoScreen from '../modules/dueno/ConfirmarPagoScreen';
import PagoStripeScreen from '../modules/dueno/PagoStripeScreen';
import ModalInfoCredenciales from '../modules/dueno/ModalInfoCredenciales';
import ModalConfirmarDescargaCredenciales from '../modules/dueno/ModalConfirmarDescargaCredenciales';
import ModalConfirmarEliminacion from '../modules/dueno/ModalConfirmarEliminacion';
import RegistroJugadorScreen from '../modules/dueno/RegistroJugadorScreen';
import DetallesJugadorScreen from '../modules/dueno/DetallesJugadorScreen';
import EsterEggScreen from '../modules/dueno/EsterEggScreen';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name="PagoStripe" component={PagoStripeScreen} />
      <Stack.Screen name="ModalInfoCredenciales" component={ModalInfoCredenciales} />
      <Stack.Screen name="ModalConfirmarDescargaCredenciales" component={ModalConfirmarDescargaCredenciales} />
      <Stack.Screen name="ModalConfirmarEliminacion" component={ModalConfirmarEliminacion} />
      <Stack.Screen name="RegistroJugadorScreen" component={RegistroJugadorScreen} />
      <Stack.Screen name="DetallesJugadorScreen" component={DetallesJugadorScreen} />
      <Stack.Screen name="EsterEgg" component={EsterEggScreen} />
    </Stack.Navigator>
  );
}
