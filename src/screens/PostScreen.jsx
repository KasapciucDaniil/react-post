import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AntDesign } from '@expo/vector-icons'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../Theme'
import { removePost, toogleBooked } from '../Store/action/postAction'
import { EditModal } from '../components/EditModal'
 
export const PostScreen = ({ navigation, onSave }) => {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')

  const post = useSelector(state => state.post.allPosts.find(post => post.id === postId))

  const booked =  useSelector(state => 
    state.post.bookedPosts.some(post => post.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    console.log(postId)
    dispatch(toogleBooked(postId))
  }, [dispatch, postId])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
      Alert.alert(
          "Удаление поста",
          "Вы точно хотите удалить этот пост?",
          [
            {
              text: "Отменить",
              style: "cancel"
            },
            { text: "Удалить", onPress() {
              navigation.navigate('Main')
              dispatch(removePost(postId))
              Alert.alert('Вы успешно удалили заметку!')
            }}
          ]
      )
  }


  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <EditModal 
        visible={modal}
        onCancel={() => setModal(false)}
        value={post.text}
      />
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AntDesign.Button
            backgroundColor={THEME.DANGER_COLOR}
            onPress={removeHandler}
            name="delete"
            color="#fff"
          >Удалить</AntDesign.Button>
        </View>
        <View style={styles.button}>
          <AntDesign.Button 
            backgroundColor={THEME.MAIN_COLOR}
            onPress={() => setModal(true)}
            name="edit"
            color="#fff"
          >
            Редактировать
          </AntDesign.Button>
        </View>
      </View>
    </ScrollView>
  )
 }
  
  PostScreen.navigationOptions = ({ navigation }) => {
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? 'ios-star' : 'ios-star-outline'

    return {
      headerTitle: 'Пост',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
           <Item
            title='Take photo'
            iconName={iconName}
            onPress={toggleHandler}
          />
        </HeaderButtons>
      )
    }
  }
  
  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200
    },
    textWrap: {
      padding: 1
    },
    text: {
      margin: 7,
      fontSize: 15
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
  