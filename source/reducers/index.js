import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import challenges from './challenges'
import notifications from './notifications'

const vrsvsApp = combineReducers({
  users,
  challenges,
  notifications,
  routing: routerReducer
})

export default vrsvsApp