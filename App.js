import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Intro from './components/intro';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const HomeScreen = ({ navigation }) => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await axios.get(API_URL);
        setRecetas(response.data.meals || []);
      } catch (error) {
        console.error('Error al obtener recetas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué receta quieres aprender hoy? 🍽️</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { receta: item })}>
              <View style={styles.recipeContainer}>
                <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{item.strMeal}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => {
  const { receta } = route.params;
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    const medida = receta[`strMeasure${i}`];
    if (ingrediente) {
      ingredientes.push(`${medida} ${ingrediente}`.trim());
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{receta.strMeal}</Text>
      <Image source={{ uri: receta.strMealThumb }} style={styles.detailImage} />
      <Text style={styles.description}>{receta.strInstructions}</Text>

      <Text style={styles.subtitle}>Ingredientes:</Text>
      {ingredientes.map((item, index) => (
        <Text key={index} style={styles.ingredient}>• {item}</Text>
      ))}
    </ScrollView>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#555',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  recipeContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#444',
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});