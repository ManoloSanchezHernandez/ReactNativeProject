import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '../../../node_modules/@react-navigation/native/lib/typescript/src';
import { estadoGlobal, estadoLoginGlobal } from '../../context/contextData';

function CardControl({ icon, title, navigateTo, backgroundColor, fullWidth }) {
  const navigation = useNavigation();

  return (
    <Card
      style={[
        styles.cardMini,
        { backgroundColor },
        fullWidth && styles.cardFullWidth,
      ]}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Card.Content style={styles.cardContentMini}>
        <Icon source={icon} size={48} color="#fff" />
        <Text style={styles.cardTitle}>{title}</Text>
      </Card.Content>
    </Card>
  );
}

export default function ScreenHome() {
  const { sumar, restar, contador } = useContext(estadoGlobal);
  const { logout, isLogin } = useContext(estadoLoginGlobal);
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.body, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Icon source="home-automation" size={30} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.primary }]}>Control del Hogar</Text>
      </View>

      <View>
        <View style={styles.cardGridRow}>
          <CardControl
            icon="lightbulb-on"
            title="Luces"
            navigateTo="lucescasa"
            backgroundColor={theme.colors.primary}
          />
          <CardControl
            icon="door"
            title="Puertas"
            navigateTo="puertascasa"
            backgroundColor={theme.colors.primary}
          />
        </View>

        <View style={styles.cardGridFullWidth}>
          <CardControl
            icon="account"
            title="Usuarios"
            navigateTo="usuarios"
            backgroundColor={theme.colors.primary}
            fullWidth
          />
        </View>
      </View>

      <Card style={[styles.counterCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Text style={[styles.counterLabel, { color: theme.colors.text }]}>Contador</Text>
          <Text style={[styles.counterValue, { color: theme.colors.text }]}>{contador}</Text>
          <View style={styles.counterActions}>
            <Button
              mode="contained"
              icon="plus"
              onPress={sumar}
              style={[styles.counterButton, { backgroundColor: theme.colors.primary }]}
              textColor="#fff"
            >
              Sumar
            </Button>
            <Button
              mode="contained"
              icon="minus"
              onPress={restar}
              style={[styles.counterButton, { backgroundColor: theme.colors.secondary }]}
              textColor="#fff"
            >
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
          textColor="#fff"
          contentStyle={{ flexDirection: 'row-reverse' }}
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
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardGridFullWidth: {
    width: '100%',
  },
  cardMini: {
    width: '48%',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 16,
  },
  cardFullWidth: {
    width: '100%',
  },
  cardContentMini: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  counterCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  counterLabel: {
    fontSize: 18,
  },
  counterValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  counterActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  counterButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 32,
    borderRadius: 8,
    paddingVertical: 6,
  },
});
