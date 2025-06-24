
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navegacion from './Navegacion';
import StateGlobal from './src/context/StateGlobal';
import StateLogin from './src/context/StateLogin';
import { createContext } from 'react';


export const estadoLoginGlobal = createContext();

// import StateGlobal from './src/context/StateGlobal';


export default function App() {
  return (
    <StateLogin>
      <StateGlobal>
        <NavigationContainer>
          <Navegacion />
        </NavigationContainer>
      </StateGlobal>
    </StateLogin>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51, 56, 57, 1)', // Color de fondo
    // para evitar que se sobreponga con la barra de estado (opcional)
  },
});
