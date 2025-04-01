import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { auth } from "../bd/firebaseConfig"; // Asegúrate de importar desde el archivo correcto
import { signOut } from "firebase/auth";

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        navigation.replace("Login"); // Redirigir a pantalla de login
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Cerrando sesión...</Text>
    </View>
  );
};

export default LogoutScreen;
