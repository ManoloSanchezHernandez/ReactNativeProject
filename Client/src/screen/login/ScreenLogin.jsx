import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoLoginGlobal } from '../../context/contextData'; // Importa el contexto de login
import { useContext } from 'react'; // Importa useContext para acceder al contexto

export default function ScreenLogin() {
    const rutas = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verpw, setverpw] = useState(true);
    const { login } = useContext(estadoLoginGlobal); // Obtén la función de login del contexto  
    const IP = process.env.EXPO_PUBLIC_IP;

    const handlogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, completa todos los campos.');

            return;

        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "user": email,
                "password": password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const response = await fetch(`http://${IP}:4000/api/usuarios/login`, requestOptions);
                const result = await response.json();
                if (result.body.status === true) {
                    alert('Bienvenido ' + result.body.user.nombre);
                    login();

                } else {
                    alert('Mensaje:', result.body.mensaje)
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'No se pudo conectar al servidor. Por favor, intentelo mas tarde');
            };
        }
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Bienvenido" titleStyle={styles.title} />
                <Card.Content>
                    <TextInput
                        label="Correo electrónico"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        left={<TextInput.Icon icon="account" />}
                    />
                    <TextInput
                        label="Contraseña"
                        mode="outlined"
                        secureTextEntry={verpw}
                        left={<TextInput.Icon icon="key" />}
                        right={<TextInput.Icon icon="eye" onPress={() => setverpw(!verpw)} />}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}

                    />
                    <Button
                        onPress={() => handlogin()}
                        icon="login"
                        mode="contained"
                        style={styles.button}
                    >
                        Login
                    </Button>
                    <Button
                        icon="account-plus"
                        mode="text"
                        onPress={() => rutas.push('createaccount')}
                        style={styles.link}
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
    link: {
        marginTop: 4,
    },
});
