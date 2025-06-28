// BotonAddPuerta.jsx
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function BotonAddPuerta({ recargarPuertas }) {
    const IP = process.env.EXPO_PUBLIC_IP;

    const agregarPuerta = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            id: 0,
            name: "Nueva puerta",
            status: 1,
            
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        try {
            const response = await fetch(`http://${IP}:4000/api/puertas/agregar`, requestOptions);

            const resultado = await response.json();
            console.log("Nueva puerta agregada:", resultado);

            if (recargarPuertas) recargarPuertas();
        } catch (error) {
            console.error("Error al agregar nueva puerta:", error);
        }
    };

    return (
        <Button
            icon="plus"
            mode="contained"
            onPress={agregarPuerta}
            style={styles.boton}
            contentStyle={styles.content}
        >
            Agregar nueva puerta
        </Button>
    );
}

const styles = StyleSheet.create({
    boton: {
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: "purple",
    },
    content: {
        paddingVertical: 8,
    },
});