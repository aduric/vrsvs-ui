import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
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
import { Router, Route, browserHistory, Link, IndexRoute, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AuthService from './util/AuthService'
import {persistStore, autoRehydrate} from 'redux-persist'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(vrsvsApp, { "users": initialUsers, "challenges": initialChallenges }, autoRehydrate());
persistStore(store)

const history = syncHistoryWithStore(browserHistory, store);

const auth = new AuthService(config.auth0key, config.auth0uri);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} auth={auth}>
        <IndexRedirect to="users" />
        <IndexRoute component={VisibleUserList}/>
        <Route path="login" component={Login}/>
        <Route path="users" component={VisibleUserList}/>
        <Route path="challenges" component={VisibleChallengeList}/>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root')
)