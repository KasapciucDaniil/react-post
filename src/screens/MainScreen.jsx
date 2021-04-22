import React, {useEffect} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../Store/action/postAction'

export const MainScreen = ({ navigation }) => {
  const openPostHnalder = post => {
      navigation.navigate('Post', {
          postId: post.id,
          booked: post.booked
      })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  
  return (
    <PostList data={allPosts} onOpen={openPostHnalder} />
  )
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Мой блог',
    headerRight: ( 
     <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
       <Item 
         title="Take photo" 
         iconName='ios-camera'  
         onPress={() => navigation.push('Create')} 
        />
     </HeaderButtons>
   ),
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