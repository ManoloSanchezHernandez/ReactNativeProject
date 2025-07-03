
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from './node_modules/@react-navigation/native/lib/typescript/src';
import Navegacion from './Navegacion';
import StateGlobal from './src/context/StateGlobal';
import StateLogin from './src/context/StateLogin';
import StateDevices from './src/context/StateDevices';
import { createContext } from 'react';
import { PaperProvider } from 'react-native-paper';
import { AppTheme } from './themes'

export const estadoLoginGlobal = createContext();

// import StateGlobal from './src/context/StateGlobal';


export default function App() {
  return (
    <PaperProvider theme={AppTheme}>
      <StateDevices>
        <StateLogin>
          <StateGlobal>
            <NavigationContainer>
              <Navegacion />
            </NavigationContainer>
          </StateGlobal>
        </StateLogin>
      </StateDevices>
    </PaperProvider>
  );
}


