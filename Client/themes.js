// src/theme/theme.js

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const colorPalette1 = {
    primary: 'rgb(106, 27, 154)',    // #6A1B9A - Morado oscuro
    secondary: 'rgb(149, 117, 205)',   // #9575CD - Morado suave
    tertiary: 'rgb(209, 196, 233)',   // #D1C4E9 - Lavanda claro
    active: 'rgb(0, 200, 83)',      // #00C853 - Verde fuerte
    inactive: 'rgb(233, 39, 39)',     // rojo oscuro (ya dado)
    background: 'rgb(243, 240, 247)',   // #F3F0F7 - Lavanda pálido
    surface: 'rgb(255, 255, 255)',   // blanco puro
    text: 'rgb(26, 26, 26)',      // #1A1A1A - Gris casi negro
};

export const colorPalette2 = {
    primary: '#6C5CE7',
    secondary: '#00CEC9',
    tertiary: '#FAB1A0',
    error: '#D63031',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#2D3436',
};

export const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colorPalette1, // aquí puedes cambiar por colorPalette2 si gustas
    },
};
