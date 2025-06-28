import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Icon, Switch, ActivityIndicator } from 'react-native-paper';

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const IP = process.env.EXPO_PUBLIC_IP;

  // Cargar usuarios desde el backend
  const cargarUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`http://${IP}:4000/api/usuarios`);
      const datos = await res.json();
      if (datos.error === false) {
        const lista = datos.body.map(usuario => ({
          id: usuario.id,
          nombre: usuario.nombre ?? "Sin nombre",
          email: usuario.email,
          estado: usuario.status === 1,
        }));
        setUsuarios(lista);
      } else {
        setError("No se pudieron cargar los usuarios.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  // Cambiar estado del usuario en el backend y actualizar UI
  const cambiarEstadoUsuario = async (id, estadoActual) => {
    try {
      const nuevoEstado = estadoActual ? 0 : 1;
      const res = await fetch(`http://${IP}:4000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nuevoEstado }),
      });

      const data = await res.json();
      if (data.error === false) {
        setUsuarios(usuarios.map(usuario =>
          usuario.id === id ? { ...usuario, estado: !estadoActual } : usuario
        ));
      } else {
        console.warn("Error al actualizar el estado en el servidor");
      }
    } catch (err) {
      console.error("Fallo al actualizar el estado del usuario", err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilos.centrado}>
        <Text style={estilos.error}>{error}</Text>
        <Button mode="contained" onPress={cargarUsuarios}>Reintentar</Button>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Control de Usuarios</Text>

      {usuarios.map(usuario => (
        <Card key={usuario.id} style={estilos.tarjeta}>
          <Card.Content style={estilos.filaSuperior}>
            <View style={estilos.iconoNombre}>
              <Icon source="account" size={36} color={usuario.estado ? "#22c55e" : "#9ca3af"} />
              <View style={estilos.infoUsuario}>
                <Text style={estilos.nombre}>{usuario.nombre}</Text>
                <Text style={estilos.email}>{usuario.email}</Text>
              </View>
            </View>
            <View style={estilos.estadoSwitch}>
              <Text style={{ marginBottom: 5, fontSize: 12, color: usuario.estado ? "#22c55e" : "#6b7280" }}>
                {usuario.estado ? "Activo" : "Inactivo"}
              </Text>
              <Switch
                value={usuario.estado}
                onValueChange={() => cambiarEstadoUsuario(usuario.id, usuario.estado)}
                color="rgb(21, 161, 0)"
              />
            </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjeta: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  contenidoTarjeta: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  nombreLuz: {
    fontSize: 12,
    marginLeft: 1,
  },
  tarjeta: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 3,
    padding: 10,
  },
  filaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconoNombre: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoUsuario: {
    marginLeft: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  estadoSwitch: {
    alignItems: 'center',
  },

});
