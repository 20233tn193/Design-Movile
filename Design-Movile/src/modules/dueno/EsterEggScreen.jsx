import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image,Dimensions,} from "react-native";
import { Icon } from "@rneui/themed";
import { useFocusEffect } from '@react-navigation/native';
const { width } = Dimensions.get("window");

export default function CuentaDuenoScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />
      <View style={styles.header}>
        <Icon name="egg-easter" type="material-community" color="#fff" size={30} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>EsterEgg</Text>
      </View>
      <View style={styles.content}>
          <>
                <View style={styles.estadoEquipoRow}>
                  <Text style={styles.estadoTexto}>
                    {"Manhattan Team"}
                  </Text>
            </View>

            <Image
              source={require("../../../assets/Mhteam.jpg")}
              style={styles.foto}
              resizeMode="contain"
            />
            <Image
              source={require("../../../assets/ManhattanLogoRojo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  franja: {
    position: "absolute",
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 90,
    marginTop: 0,
    left: -width,
    backgroundColor: "#d80027",
    transform: [{ rotate: "-10deg" }],
  },
  franjaNegraTop: {
    top: 90,
    marginTop: 50,
    left: -width,
    backgroundColor: "#1a1a1a",
    transform: [{ rotate: "-10deg" }],
    zIndex: 1,
  },
  franjaGrisTop: {
    marginTop: 70,
    top: 120,
    left: -width,
    backgroundColor: "#e6e6e6",
    transform: [{ rotate: "-10deg" }],
    zIndex: 0,
  },
  franjaGrisBottom: {
    bottom: 70,
    left: -width,
    backgroundColor: "#e6e6e6",
    transform: [{ rotate: "10deg" }],
  },
  franjaNegraBottom: {
    bottom: 35,
    left: -width,
    backgroundColor: "#1a1a1a",
    transform: [{ rotate: "10deg" }],
  },
  franjaRojaBottom: {
    bottom: 0,
    left: -width,
    backgroundColor: "#d80027",
    transform: [{ rotate: "10deg" }],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    paddingTop: 50,
    width: "100%",
    zIndex: 2,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 120,
    zIndex: 3,
  },
  estadoEquipoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001F4E',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 3,
    gap: 10,
    justifyContent: 'center',
    left: -50,
    marginBottom: -30,
  },
  estadoTexto: {
    color: "#FDBA12",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: -90,
  },
  foto: {
    width: 400,
    height: 400,
    marginTop: 0,
  },
});