import React from 'react'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { PostList } from '../components/PostList'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

export const BookedScreen = ({ navigation }) => {
  const openPostHnalder = post => {
    navigation.navigate('Post', {
        postId: post.id,
        booked: post.booked
    })
  }

  const bookedPosts = useSelector(state => state.post.bookedPosts)
    
    return (
      <PostList data={bookedPosts} onOpen={openPostHnalder} />
    )
}

BookedScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Избранное',
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