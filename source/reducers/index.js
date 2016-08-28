import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import challenges from './challenges'

const vrsvsApp = combineReducers({
  users,
  challenges,
  routing: routerReducer
})

export default vrsvsApp