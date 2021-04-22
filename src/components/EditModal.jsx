import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native'

import { remakePost } from '../Store/action/postAction'

export const EditModal = ({ visible, onCancel, value }) => {
  const [title, setTitle] = useState(value)
  const dispatch = useDispatch()

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Ошибка!', `Минимальная длина 3 символа. Сейчас ${title.trim().length} символов!`
      )
    } else {
      Alert.alert(
        "Изменение поста",
        "Вы точно хотите изменить название этот пост?",
        [
          {
            text: "Отменить",
            style: "cancel"
          },
          { text: "Изменить", onPress() {
            dispatch(remakePost(value))
            Alert.alert(`Вы успешно изменили название на ${title}!`)
          }}
        ]
    )
    }
  }

  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View style={styles.wrap}>
        <TextInput 
          value={title}
          onChangeText={setTitle}
          style={styles.input} 
          autoCapitalize="none" 
          placeholder="Введите новое название поста..." 
          maxLength={20}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <AntDesign.Button 
              onPress={onCancel} 
              name="back" 
              size={25}
            >
              Назад
            </AntDesign.Button>
          </View>

          <View style={styles.button}>
            <Button 
              title="Сохранить"
              onPress={onCancel}   
              size={25} 
              color="green"
              disabled={!title}
              onPress={saveHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '40%'
  }
})