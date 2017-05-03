import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import users from './users'
import challenges from './challenges'

// Add Firebase to reducers
const rootReducer = combineReducers({
  challenges,
  firebase: firebaseStateReducer,
  routing: routerReducer
})

export default rootReducer