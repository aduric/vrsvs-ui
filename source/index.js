import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import vrsvsApp from './reducers'
import App from './components/App'
import NotFound from './components/NotFound'
import Login from './components/Login'
import VisibleUserList from './containers/VisibleUserList'
import Lock from './containers/Lock'
import VisibleChallengeList from './containers/VisibleChallengeList'
import initialUsers from '../data/users.json'
import initialChallenges from '../data/challenges.json'
import config from '../config.json'
import { Route, Link, IndexRoute, IndexRedirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AuthService from './util/AuthService'
import {persistStore, autoRehydrate} from 'redux-persist'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  vrsvsApp, 
  { "users": initialUsers, "challenges": initialChallenges }, 
  compose(
    applyMiddleware(middleware), 
    autoRehydrate()));

const auth = new AuthService(config.auth0key, config.auth0uri);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} auth={auth} />
        <Route path="/login" component={Login}/>
        <Route path="/users" component={VisibleUserList}/>
        <Route path="/challenges" component={VisibleChallengeList}/>
      </div>
    </ConnectedRouter>
  </Provider>
, document.getElementById('root')
)