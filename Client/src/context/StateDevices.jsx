// context/StateDispositivos.jsx
import React, { useState } from "react";
import { devicesGlobal } from "./contextData";

export default function StateDevices({ children }) {
    const [estadoLuces, setEstadoLuces] = useState({});
    const [estadoPuertas, setEstadoPuertas] = useState({});

    const IP = process.env.EXPO_PUBLIC_IP;

    // ----------------------------- Luces -----------------------------
    const cambiarEstadoLuz = async (id) => {
        const nuevoEstado = !estadoLuces[id];
        setEstadoLuces((prev) => ({
            ...prev,
            [id]: nuevoEstado,
        }));

        try {
            const res = await fetch(`http://${IP}:4000/api/luces/agregar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, status: nuevoEstado ? 1 : 0 }),
            });

            const data = await res.json();
            if (data.error === false) {
                console.log(`Luz ${id} actualizada correctamente.`);
            } else {
                console.warn("Error en el servidor:", data.message);
            }
        } catch (err) {
            console.error(`Error al actualizar luz ${id}:`, err);
        }
    };

    const obtenerEstadoLuz = (id) => estadoLuces[id] || false;

    const ObtenerTodasLuces = () => {
        console.log("Luces registradas:", estadoLuces);
    };

    // ----------------------------- Puertas -----------------------------
    const cambiarEstadoPuerta = async (id) => {
        const nuevoEstado = !estadoPuertas[id];
        setEstadoPuertas((prev) => ({
            ...prev,
            [id]: nuevoEstado,
        }));

        try {
            const res = await fetch(`http://${IP}:4000/api/puertas/agregar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, status: nuevoEstado ? 1 : 0 }),
            });

            const data = await res.json();
            if (data.error === false) {
                console.log(`Puerta ${id} actualizada correctamente.`);
            } else {
                console.warn("Error en el servidor:", data.message);
            }
        } catch (err) {
            console.error(`Error al actualizar puerta ${id}:`, err);
        }
    };

    const obtenerEstadoPuerta = (id) => estadoPuertas[id] || false;

    const establecerEstadoPuertasDesdeLista = (listaPuertas) => {
        const nuevosEstados = {};
        listaPuertas.forEach(p => {
            nuevosEstados[p.id] = p.status === 1;
        });
        setEstadoPuertas(nuevosEstados);
        console.log("Estados de puertas cargados:", nuevosEstados);
    };

    const ObtenerTodasPuertas = () => {
        console.log("Puertas registradas:", estadoPuertas);
    };

    return (
        <devicesGlobal.Provider
            value={{
                estadoLuces,
                estadoPuertas,
                cambiarEstadoLuz,
                obtenerEstadoLuz,
                ObtenerTodasLuces,
                cambiarEstadoPuerta,
                obtenerEstadoPuerta,
                establecerEstadoPuertasDesdeLista,
                ObtenerTodasPuertas,
            }}
        >
            {children}
        </devicesGlobal.Provider>
    );
}
