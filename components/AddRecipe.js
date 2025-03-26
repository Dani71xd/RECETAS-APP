import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, Picker, StyleSheet } from "react-native";
import { db, collection, addDoc } from "../firebaseConfig";

const AddRecipe = ({ navigation }) => {
  const [strMeal, setStrMeal] = useState("");
  const [strCategory, setStrCategory] = useState("Beef");
  const [strInstructions, setStrInstructions] = useState("");
  const [strMealThumb, setStrMealThumb] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [measures, setMeasures] = useState("");

  const handleAddRecipe = async () => {
    if (!strMeal || !strInstructions || !strMealThumb || !ingredients || !measures) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const ingredientList = ingredients.split(",").map((item) => item.trim());
    const measureList = measures.split(",").map((item) => item.trim());

    try {
      await addDoc(collection(db, "recetas"), {
        strMeal,
        strCategory,
        strInstructions,
        strMealThumb,
        strIngredients: ingredientList,
        strMeasures: measureList,
        createdAt: new Date()
      });

      Alert.alert("Éxito", "Receta agregada correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar receta:", error);
      Alert.alert("Error", "No se pudo agregar la receta.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre de la receta:</Text>
      <TextInput value={strMeal} onChangeText={setStrMeal} style={styles.input} />

      <Text style={styles.label}>Categoría:</Text>
      <Picker selectedValue={strCategory} onValueChange={(itemValue) => setStrCategory(itemValue)} style={styles.picker}>
        <Picker.Item label="Beef" value="Beef" />
        <Picker.Item label="Chicken" value="Chicken" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Seafood" value="Seafood" />
      </Picker>

      <Text style={styles.label}>Instrucciones:</Text>
      <TextInput value={strInstructions} onChangeText={setStrInstructions} style={styles.inputMultiline} multiline />

      <Text style={styles.label}>URL de la imagen:</Text>
      <TextInput value={strMealThumb} onChangeText={setStrMealThumb} style={styles.input} />

      <Text style={styles.label}>Ingredientes (separados por coma):</Text>
      <TextInput value={ingredients} onChangeText={setIngredients} style={styles.input} />

      <Text style={styles.label}>Medidas (separadas por coma):</Text>
      <TextInput value={measures} onChangeText={setMeasures} style={styles.input} />

      <View style={styles.buttonContainer}>
        <Button title="Agregar Receta" onPress={handleAddRecipe} color="#28a745" />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Volver" onPress={() => navigation.goBack()} color="#dc3545" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddRecipe;