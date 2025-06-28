// components/PuertasCasa.jsx
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, Icon, Switch, ActivityIndicator } from 'react-native-paper';
import { devicesGlobal } from '../../context/contextData';

export default function PuertasCasa() {
  const IP = process.env.EXPO_PUBLIC_IP;

  const {
    estadoPuertas,
    cambiarEstadoPuerta,
    obtenerEstadoPuerta,
    establecerEstadoPuertasDesdeLista,
  } = useContext(devicesGlobal);

  const [nombresPuertas, setNombresPuertas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarPuertas = async () => {
    setCargando(true);
    try {
      const res = await fetch(`http://${IP}:4000/api/puertas`);
      const datos = await res.json();

      if (!datos.error) {
        establecerEstadoPuertasDesdeLista(datos.body);
        const nombres = {};
        datos.body.forEach(p => {
          nombres[p.id] = p.name || `Puerta ${p.id}`;
        });
        setNombresPuertas(nombres);
      } else {
        setError("No se pudieron cargar las puertas.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPuertas();
  }, []);

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando Puertas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilos.centrado}>
        <Text style={estilos.error}>{error}</Text>
        <Button mode="contained" onPress={cargarPuertas}>Reintentar</Button>
      </View>
    );
  }

  const puertasIds = Object.keys(nombresPuertas);

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Control de Puertas</Text>

      {puertasIds.map(id => (
        <Card key={id} style={estilos.tarjeta}>
          <Card.Content style={estilos.contenidoTarjeta}>
            <Icon
              source="lock"
              color={obtenerEstadoPuerta(id) ? "#34D399" : "#9CA3AF"}
              size={30}
            />
            <Text style={estilos.nombrePuerta}>{nombresPuertas[id]}</Text>
            <Switch
              value={obtenerEstadoPuerta(id)}
              onValueChange={() => cambiarEstadoPuerta(id)}
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
  nombrePuerta: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});
