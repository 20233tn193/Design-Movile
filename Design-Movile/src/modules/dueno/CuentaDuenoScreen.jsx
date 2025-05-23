import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerDuenoPorId, obtenerEquipoPorDueno } from "../../api/api";
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get("window");

export default function CuentaDuenoScreen() {
  const navigation = useNavigation();
  const [dueno, setDueno] = useState(null);
  const [equipo, setEquipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [correo, setCorreo] = useState(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('rol');
      await AsyncStorage.removeItem('correo');
      await AsyncStorage.removeItem('duenoId');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.log('❌ Error al cerrar sesión:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const duenoId = await AsyncStorage.getItem("duenoId");
          const token = await AsyncStorage.getItem("token");

          console.log("✅ duenoId:", duenoId);
          console.log("✅ token:", token);

          if (!duenoId) {
            console.warn("⚠️ No se encontró duenoId");
            return;
          }

          const duenoData = await obtenerDuenoPorId(duenoId);
          console.log("📦 Datos del dueño:", duenoData);
          setDueno(duenoData);

          const equipos = await obtenerEquipoPorDueno(duenoId);
          //console.log("📦 Equipos del dueño:", equipos);

          if (equipos.length > 0) {
            setEquipo(equipos[0]);
            //console.log("✅ Primer equipo:", equipos[0]);
          } else {
            setEquipo(null);
            console.log("ℹ️ El dueño no tiene equipos registrados.");
          }
          const correoGuardado = await AsyncStorage.getItem("correo");
          setCorreo(correoGuardado);


        } catch (error) {
          console.error("❌ Error cargando datos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      // Cleanup no necesario en este caso
    }, [])
  );


  return (
    <View style={styles.container}>
      {/* Franjas decorativas */}
      <View style={[styles.franja, styles.franjaRojaTop]} />
      <View style={[styles.franja, styles.franjaNegraTop]} />
      <View style={[styles.franja, styles.franjaGrisTop]} />
      <View style={[styles.franja, styles.franjaGrisBottom]} />
      <View style={[styles.franja, styles.franjaNegraBottom]} />
      <View style={[styles.franja, styles.franjaRojaBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="user" type="font-awesome" color="#fff" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.headerText}>Cuenta</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#001F4E" />
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.rowTop}>
                {equipo?.logoUrl ? (
                  <Image
                    source={{ uri: equipo.logoUrl }}
                    style={[styles.fotoPlaceholder, { resizeMode: 'contain' }]}
                  />
                ) : (
                  <View style={styles.fotoPlaceholder} />
                )}

                <View style={styles.estadoEquipoRow}>
                  <Text style={styles.estadoTexto}>
                    {equipo ? equipo.nombre : "Sin equipo"}
                  </Text>

                  {equipo && (
                    <TouchableOpacity
                      style={styles.editEquipoIcon}
                      onPress={() => navigation.navigate("ActualizarEquipoScreen", { equipo })}
                    >
                      <Icon name="edit" type="feather" size={20} color="#FDBA12" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>



              <Text style={styles.nombre}>
                {dueno?.nombre || ""} {dueno?.apellido || ""}
              </Text>
              <Text style={styles.dato}>
                {correo || "Correo no disponible"}
              </Text>

              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => navigation.navigate("ActualizarCuentaDueno")}
              >
                <Icon name="edit" type="feather" size={30} color="#000" />
              </TouchableOpacity>
            </View>

            {equipo ? (
              <TouchableOpacity
                style={styles.botonAzul}
                onPress={() => navigation.navigate("InscripcionesDuenoScreen")} // asegúrate de que esta ruta esté registrada
              >
                <Text style={styles.botonTexto}>Torneos Inscritos</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.botonAzul}
                onPress={() => navigation.navigate("RegistroEquipoDueno")}
              >
                <Text style={styles.botonTexto}>Crear Equipo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.botonRojo} onPress={handleLogout}>
              <Text style={styles.botonTexto}>Cerrar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("EsterEgg")}>
              <Image
                source={require("../../../assets/ManhattanLogoRojo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
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
    fontSize: 18,
  },
  franja: {
    position: "absolute",
    width: width * 2,
    height: 50,
    zIndex: 0,
  },
  franjaRojaTop: {
    top: 80,
    left: -width,
    backgroundColor: "#d80027",
    transform: [{ rotate: "-10deg" }],
  },
  franjaGrisTop: {
    top: 160,
    left: -width,
    backgroundColor: "#e6e6e6",
    transform: [{ rotate: "-10deg" }],
  },
  franjaNegraTop: {
    top: 130,
    left: -width,
    backgroundColor: "#1a1a1a",
    transform: [{ rotate: "-10deg" }],
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
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 120,
    zIndex: 3,
  },
  
  

  //Extras personales de pantalla
  estadoEquipoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001F4E',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 10,
    justifyContent: 'center',
    left: -25,
  },
  editEquipoIcon: {
    paddingLeft: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 0,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botonAzul: {
    backgroundColor: "#001F4E",
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  botonRojo: {
    backgroundColor: "#B80000",
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  
  estadoTexto: {
    color: "#FDBA12",
    fontWeight: "bold",
    fontSize: 24,
  },
  nombre: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  dato: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    marginBottom: 20,
    position: "relative",
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fotoPlaceholder: {
    width: 140,
    height: 140,
    backgroundColor: "#ccc",
    borderRadius: 10,
    left: -25,
  },
  estadoEquipo: {
    backgroundColor: "#001F4E",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 12,
  },
});