import React, { useState, useRef } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button, 
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../Theme'
import { addPost } from '../Store/action/postAction'
import { PhotoPicker } from '../components/PhotoPicker'


export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const imgRef = useRef()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(addPost(post))
    navigation.navigate('Main')
    Alert.alert('Вы успешно создали заметку!')
  }

  const photoHanlder = uri => {
    imgRef.current = uri
  }

  return (
    <ScrollView>
     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Создать пост</Text>
        <TextInput
          style={styles.textarea} 
          placeholder="Введите текст заметки..."
          value={text}
          onChangeText={setText}
          multiline
        />
        <PhotoPicker onPick={photoHanlder} />
        <Button 
          title="Создать пост" 
          color={THEME.MAIN_COLOR} 
          onPress={saveHandler} 
          disabled={!text}
        />
      </View>
     </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
   headerTitle: 'Create',
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
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10
  }
})