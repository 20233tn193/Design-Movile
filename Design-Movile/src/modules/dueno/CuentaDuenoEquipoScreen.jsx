import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import BottomTabs from '../../navigation/BottomTabs';

export default function CuentaDuenoEquipoScreen() {
  return (
    <View style={styles.container}>
      {/* Franjas decorativas superiores */}
      <View style={styles.decorativeTop}>
        <View style={[styles.franja, { backgroundColor: '#A00000' }]} />
        <View style={[styles.franja, { backgroundColor: '#2D2D2D' }]} />
        <View style={[styles.franja, { backgroundColor: '#E8E8E8' }]} />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.profileImage} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Sin equipo</Text>
              <Icon name="edit" type="feather" size={14} color="white" />
            </View>
          </View>

          <Text style={styles.name}>Juan Chavez</Text>
          <Text style={styles.email}>20233tn152@utez.edu.mx</Text>
          <Text style={styles.phone}>7772074581</Text>

          <TouchableOpacity style={styles.editBtn}>
            <Icon name="edit" type="feather" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnBlue}>
          <Text style={styles.btnText}>Crear Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRed}>
          <Text style={styles.btnText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Image
          source={require('../../../assets/manhattan_logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Franjas decorativas inferiores */}
      <View style={styles.decorativeBottom}>
        <View style={[styles.franja, { backgroundColor: '#E8E8E8' }]} />
        <View style={[styles.franja, { backgroundColor: '#2D2D2D' }]} />
        <View style={[styles.franja, { backgroundColor: '#A00000' }]} />
      </View>

      {/* Navegación inferior */}
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  franja: { height: 20, transform: [{ rotate: '-6deg' }], marginTop: -6 },
  decorativeTop: { height: 60 },
  decorativeBottom: { height: 60, justifyContent: 'flex-end' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
    position: 'relative',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: {
    width: 60, height: 60,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginRight: 10,
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: '#0C1A3E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeText: { color: '#FDBA12', fontWeight: 'bold', marginRight: 4 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14, color: '#555' },
  phone: { fontSize: 14, color: '#555' },
  editBtn: { position: 'absolute', bottom: 10, right: 10 },
  btnBlue: {
    backgroundColor: '#0C1A3E',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnRed: {
    backgroundColor: '#A00000',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  logo: { width: 200, height: 60, marginTop: 10 },
});