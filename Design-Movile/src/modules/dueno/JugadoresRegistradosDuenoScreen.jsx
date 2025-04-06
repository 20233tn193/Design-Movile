import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';
import ModalInformacionCredenciales from './ModalInfoCredenciales';
import ModalConfirmarDescargaCredenciales from './ModalConfirmarDescargaCredenciales';

const { width } = Dimensions.get('window');

export default function JugadoresRegistradosDuenoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmarVisible, setModalConfirmarVisible] = useState(false);

  // ⚠ Estado del torneo (puedes reemplazar esto con props o datos reales)
  const torneoCerrado = true;

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏆 Jugadores Registrados</Text>
      </View>

      {/* Franjas decorativas */}
      <View style={styles.triangleTopRed} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />

      {/* Tarjeta del torneo */}
      <View style={styles.torneoCard}>
        <Image source={require('../../../assets/madrid.png')} style={styles.logo} />
        <View style={styles.torneoInfo}>
          <Text style={styles.nombreTorneo}>Torneo Infantil</Text>
          <Text style={styles.estadoCerrado}>CERRADO</Text>
          <Text style={styles.subtexto}>05/03/2025   10 clubs</Text>
        </View>
        <TouchableOpacity style={styles.btnPago}>
          <Icon name="dollar" type="font-awesome" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabla */}
      <View style={styles.encabezadoTabla}>
        <Text style={styles.th}>Nombre</Text>
        <Text style={styles.th}>Apellido</Text>
        <Text style={styles.thAcciones}>Acciones</Text>
      </View>

      <ScrollView style={styles.listaJugadores}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.fila}>
            <Text style={styles.td}>Hanna</Text>
            <Text style={styles.td}>Perez</Text>
            <View style={styles.acciones}>
              <TouchableOpacity>
                <Icon name="pencil" type="font-awesome" size={18} color="#d80027" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="id-card" type="font-awesome" size={18} color="#0e1b39" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity
          style={[
            styles.btnGenerar,
            { backgroundColor: torneoCerrado ? '#FDBA12' : '#ccc' },
          ]}
          onPress={() => {
            if (torneoCerrado) {
              setModalConfirmarVisible(true); // mostrar modal para confirmar descarga
            } else {
              setModalVisible(true); // mostrar modal informativo
            }
          }}
        >
          <Text style={styles.btnTextoGenerar}>Generar Credenciales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgregar}>
          <Text style={styles.btnTextoAgregar}>AGREGAR</Text>
        </TouchableOpacity>
      </View>

      {/* Modal informativo cuando torneo no está cerrado */}
      <ModalInformacionCredenciales
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal de confirmación para descarga */}
      <ModalConfirmarDescargaCredenciales
        visible={modalConfirmarVisible}
        onClose={() => setModalConfirmarVisible(false)}
        onConfirm={() => {
          setModalConfirmarVisible(false);
          // 👉 lógica real para generar/descargar credenciales
        }}
      />
    </View>
  );
}