import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, Icon, Switch, ActivityIndicator } from 'react-native-paper';
import { devicesGlobal } from '../../context/contextData';

export default function LucesCasa() {
  const IP = process.env.EXPO_PUBLIC_IP;

  const {
    estadoLuces,
    cambiarEstadoLuz,
    obtenerEstadoLuz,
    ObtenerTodasLuces,
  } = useContext(devicesGlobal);

  const [nombresLuces, setNombresLuces] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarLuces = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`http://${IP}:4000/api/luces`);
      const datos = await res.json();

      if (datos.error === false) {
        // Mapeamos estados globales
        const estadosIniciales = {};
        const nombresIniciales = {};

        datos.body.forEach(luz => {
          estadosIniciales[luz.id] = luz.status === 1;
          nombresIniciales[luz.id] = luz.name || `Luz ${luz.id}`;
        });

        // Guardamos estados y nombres
        setNombresLuces(nombresIniciales);
        // Simulamos setEstadoLuces global — no está en tu contexto, así que usamos cambiarEstadoLuz por cada uno
        Object.keys(estadosIniciales).forEach(id => {
          if (estadoLuces[id] === undefined) {
            cambiarEstadoLuz(id); // Establece el valor inicial
            if (estadosIniciales[id] !== true) cambiarEstadoLuz(id); // Asegura el valor correcto
          }
        });

        ObtenerTodasLuces();
      } else {
        setError("No se pudieron cargar las luces.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLuces();
  }, []);

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando luces...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilos.centrado}>
        <Text style={estilos.error}>{error}</Text>
        <Button mode="contained" onPress={cargarLuces}>Reintentar</Button>
      </View>
    );
  }

  const lucesIds = Object.keys(nombresLuces);

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Mis Luces</Text>

      {lucesIds.map(id => (
        <Card key={id} style={estilos.tarjeta}>
          <Card.Content style={estilos.contenidoTarjeta}>
            <Icon
              source="lightbulb"
              color={obtenerEstadoLuz(id) ? "gold" : "gray"}
              size={30}
            />
            <Text style={estilos.nombreLuz}>{nombresLuces[id]}</Text>
            <Switch
              value={obtenerEstadoLuz(id)}
              onValueChange={() => cambiarEstadoLuz(id)}
            />
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    padding: 16,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjeta: {
    marginBottom: 10,
  },
  contenidoTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  nombreLuz: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});
