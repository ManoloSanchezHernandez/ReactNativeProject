import React, { useState } from 'react';
import { Alert } from 'react-native';
import { estadoLoginGlobal } from './contextData';
import Constants from 'expo-constants';

export default function StateLogin({ children }) {
    const [dataUser, setDataUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const IP = process.env.EXPO_PUBLIC_IP; // o la forma correcta según tu configuración

    const login = () => setIsLogin(true);
    const logout = () => setIsLogin(false);

    const obtenerDatosUser = async () => {
        try {
            const response = await fetch(`http://${IP}:4000/api/usuarios`);
            const result = await response.json();

            if (result && result.body) {
                setDataUser(result.body);
            } else {
                console.error("Formato de respuesta inesperado", result);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const eliminarUser = async (id) => {
        try {
            const response = await fetch(`http://${IP}:4000/api/usuarios/eliminar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();

            if (result && result.body) {
                Alert.alert("Resultado", result.body);
                obtenerDatosUser();  // refrescar lista
            } else {
                Alert.alert("Error", "Respuesta inesperada al eliminar usuario.");
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <estadoLoginGlobal.Provider value={{ login, logout, isLogin, dataUser, obtenerDatosUser, eliminarUser }}>
            {children}
        </estadoLoginGlobal.Provider>
    );
}
