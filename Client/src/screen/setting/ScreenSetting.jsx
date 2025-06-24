import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

export default function ScreenSetting() {
  const {outlogin} = useContext(estadoLoginGlobal); // Obtén la función de logout del contexto
  return (
    <View style={styles.body}>
      <Text style={styles.title}>ScreenSetting</Text>
      <Button onPress={() => outlogin()} mode="contained" style={{marginTop: 20}}>
        Cerrar cesion 
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    title:{
        color: 'rgb(255, 0, 0)',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})