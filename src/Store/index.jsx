import { createStore, combineReducers } from 'redux'
import { PostReducer } from './reducers/postReducer'

const rootReducer = combineReducers({
  post: PostReducer
})

export default createStore(rootReducer)