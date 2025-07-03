import { estadoLoginGlobal } from './contextData';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function StateLogin({ children }) {
    const [dataUser, setdataUser] = useState([]);  // cambio importante
    const [isLogin, setIsLogin] = useState(true                                                                                                                                                                                            );

    const login = () => setIsLogin(true);
    const logout = () => setIsLogin(false);

    const IP = process.env.EXPO_PUBLIC_IP;

    const obtenerDatosUser = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        try {
            const response = await fetch(`http://${IP}:4000/api/usuarios`);
            const result = await response.json();
            setdataUser(result.body);
            // console.log(result.body);
        } catch (error) {
            console.error(error);
        }
    }

    const eliminarUser = async (id) => {
        try {
            const response = await fetch(`http://${IP}:4000/api/usuarios/eliminar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            Alert.alert("Resultado", result.body);
            obtenerDatosUser();  // para actualizar lista después de eliminar
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <estadoLoginGlobal.Provider value={{ login, logout, isLogin, dataUser, obtenerDatosUser, eliminarUser }}>
            {children}
        </estadoLoginGlobal.Provider>
    );
}
