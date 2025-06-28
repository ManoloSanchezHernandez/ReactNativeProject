import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal, estadoLoginGlobal } from '../../context/contextData';

function CardControl({ icon, title, navigateTo }) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Icon source={icon} size={50} color={theme.colors.primary} />
        <Button 
          mode="contained-tonal"
          icon={icon}
          style={styles.button}
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => navigation.navigate(navigateTo)}
        >
          {title}
        </Button>
      </Card.Content>
    </Card>
  );
}

export default function ScreenHome() {
  const theme = useTheme();
  const { sumar, restar, contador } = useContext(estadoGlobal);
  const { logout, isLogin } = useContext(estadoLoginGlobal);

  return (
    <ScrollView contentContainerStyle={[styles.body, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Control del Hogar</Text>

      <CardControl icon="lightbulb-on" title="Control de Luces" navigateTo="lucescasa" />
      <CardControl icon="door" title="Control de Puertas" navigateTo="puertascasa" />
      <CardControl icon="account" title="Control del Usuarios" navigateTo="perfil" />

      <Card style={[styles.card, styles.counterCard]}>
        <Card.Content>
          <Text style={styles.counterText}>
            Contador: <Text style={{ fontWeight: 'bold' }}>{contador}</Text>
          </Text>
          <View style={styles.counterActions}>
            <Button mode="outlined" icon="plus" onPress={sumar} style={styles.counterButton}>
              Sumar
            </Button>
            <Button mode="outlined" icon="minus" onPress={restar} style={styles.counterButton}>
              Restar
            </Button>
          </View>
        </Card.Content>
      </Card>

      {isLogin && (
        <Button
          mode="contained"
          icon="logout"
          onPress={logout}
          style={styles.logoutButton}
          buttonColor={theme.colors.error}
        >
          Cerrar Sesión
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  counterCard: {
    marginTop: 24,
    padding: 16,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    width: '100%',
  },
  counterText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  counterActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  counterButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  logoutButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});
