import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button, TextInput, Card } from 'react-native-paper';
import { useNavigation } from '../../../node_modules/@react-navigation/native/lib/typescript/src';
import { estadoLoginGlobal } from '../../context/contextData';

export default function ScreenCreate() {
    const rutas = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(estadoLoginGlobal);
    const IP = process.env.EXPO_PUBLIC_IP; // Asegúrate de que esta variable esté definida en tu entorno 

    const handleCreateAccount = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Campos vacíos', 'Por favor, completa todos los campos.');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: 0,
                nombre: name,
                pw: password,
                email: email,
                status: '1'
            }),
        };

        try {
            const response = await fetch(`http://${IP}:4000/api/usuarios/agregar`, requestOptions);
            const result = await response.json();

            if (result?.body?.status === true) {
                // const userName = result.body?.user?.nombre || name;
                Alert.alert('Éxito', 'Bienvenido ' + result.body.name || nombre);
                login(); // Actualiza estado global
            } else {
                Alert.alert('Error', result.body?.mensaje || 'No se pudo crear la cuenta');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo conectar al servidor. Por favor, inténtalo más tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Crear Cuenta" titleStyle={styles.title} />
                <Card.Content>
                    <TextInput
                        label="Nombre"
                        mode="outlined"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Correo electrónico"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        label="Contraseña"
                        mode="outlined"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                    <Button
                        icon="account-plus"
                        mode="contained"
                        onPress={handleCreateAccount}
                        style={styles.button}
                    >
                        Crear cuenta
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2F5',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});
