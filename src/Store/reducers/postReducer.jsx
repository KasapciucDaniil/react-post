import { LOAD_POSTS, REMOVE_POST, TOOGLE_BOOKED, ADD_POST, REMAKE_POST } from "../types"

const initialState = {
   allPosts: [],
   bookedPosts: []
}

export const PostReducer = ( state = initialState, action ) => {
   switch (action.type) {
     case LOAD_POSTS: 
       return { 
          ...state,
          allPosts: action.payload, 
          bookedPosts: action.payload.filter(post => post.booked)
         }
     case TOOGLE_BOOKED : {
       const allPosts = state.allPosts.map(post => {
         if (post.id === action.payload) {
           post.booked = !post.booked 
         }

         return post
       })
       
       return {...state, allPosts, bookedPosts: allPosts.filter(post => post.booked)}
     }   
     case REMOVE_POST : 
      return {
         ...state, 
         allPosts: state.allPosts.filter(p => p.id !== action.payload),
         bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
      }    
    case ADD_POST : 
      return {
        ...state,
        allPosts: [{ ...action.payload },...state.allPosts]
      }
    case REMAKE_POST : {
      return {
        ...state, allPosts: state.allPosts.map(post => {
          if (post.id === action.id) {
            post.title = action.title
          }
          return {
            ...post,
            ...action.post
          }
        })
     }   
    }  

     default: return state
   }

   return state
}