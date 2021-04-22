import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AntDesign } from '@expo/vector-icons'
import { THEME } from '../Theme'

export const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <Text>Это приложение с личными заметками.</Text>
          <Text>Версия приложения<Text> 1.0.0</Text></Text>
          <View style={styles.button} >
            {/* <AntDesign.Button 
              name="addfile" 
              size={23} 
              backgroundColor={THEME.MAIN_COLOR} 
              color="#fff"
              onPress={() => navigation.push('Create')}
            >
              Create Post
            </AntDesign.Button> */}
          </View>
        </View>
    )
}

AboutScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'About',
   headerLeft: ( 
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item 
        title="Toggle Drawer" 
        iconName='ios-menu'  
        onPress={() => navigation.toggleDrawer()} 
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  button: {
    marginTop: 10
  }
})