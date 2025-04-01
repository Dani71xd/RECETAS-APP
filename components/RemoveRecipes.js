import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { db } from "../bd/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // 🔥 Import correcto

const RemoveRecipes = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recetas"));
      const recipesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(recipesList);
    } catch (error) {
      console.error("Error al obtener recetas:", error);
      Alert.alert("Error", "No se pudieron obtener las recetas.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const recetaRef = doc(db, "recetas", id); // 📌 Referencia correcta al documento
      await deleteDoc(recetaRef); // 🚀 Eliminación correcta en Firestore
      Alert.alert("Éxito", "Receta eliminada correctamente.");
      fetchRecipes(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      Alert.alert("Error", "No se pudo eliminar la receta.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Recetas</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.strMeal}</Text>
            <Button title="Eliminar" onPress={() => handleDelete(item.id)} color="#dc3545" />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Volver" onPress={() => navigation.goBack()} color="#6c757d" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RemoveRecipes;
