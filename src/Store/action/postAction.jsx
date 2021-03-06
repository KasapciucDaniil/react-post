import { LOAD_POSTS, TOOGLE_BOOKED, REMOVE_POST, ADD_POST, REMAKE_POST } from '../types'

export const loadPosts = () => {
    return {
      type: LOAD_POSTS,
      payload: []
    }
}

export const toogleBooked = id => {
  return {
    type: TOOGLE_BOOKED,
    payload: id
  }
}

export const removePost = id => {
  return {
    type: REMOVE_POST,
    payload: id
  }
}

export const addPost = post => {
  post.id = Date.now().toString()

  return {
    type: ADD_POST,
    payload: post
  }
}

export const remakePost = text => {
  return {
    type: REMAKE_POST,
    payload: text
  }
}