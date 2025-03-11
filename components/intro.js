import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Intro = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image 
      source={{ uri:'https://cdn-icons-png.flaticon.com/128/706/706195.png' 
      }}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Recetas Deliciosas</Text>
      <Text style={{ fontSize: 15, color: 'gray', marginVertical: 10 }}>Realiza cualquier plato que desees</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={{ backgroundColor: '#ff6000', paddingVertical: 15, borderRadius: 10, marginTop: 30, paddingHorizontal: 30 }}
      >
        <Text style={{ color: 'white', fontSize: 25 }}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Intro;
