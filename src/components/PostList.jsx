import React from 'react'
import { FlatList, View, Text, StyleSheet, Image } from 'react-native'

import { Post } from './Post'

export const PostList = ({ data, onOpen }) => {
  
  if (!data.length) {
    return <View style={styles.container}>
      <Text style={styles.noItems}>Постов пока нет!</Text>
      <Image style={styles.image} source={require('../../assets/post.jpg')} />
    </View>
  }

  return (
    <View style={styles.wrapper}>
       <FlatList 
         data={data} 
         keyExtractor={post => post.id.toString()} 
         renderItem={({item}) => <Post post={item} onOpen={onOpen} 
       />
      } 
     />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
      padding: 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    noItems: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 23
    },
    button: {
      width: '50%'
    },
    image: {
      width: '100%',
      height: 350,
      borderRadius: 7
    }
})