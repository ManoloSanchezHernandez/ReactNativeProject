import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonLogout from '../../components/buttonLogout'


export default function ScreenSetting() {

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Configuraciones</Text>
      <ButtonLogout />
    </View>
  )
}

const styles = StyleSheet.create({
    title:{
        color: 'rgb(0, 153, 255)',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        
    }
})