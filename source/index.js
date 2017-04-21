import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import vrsvsApp from './reducers'
import App from './components/App'
import NotFound from './components/NotFound'
import Login from './components/Login'
import VisibleUserList from './containers/VisibleUserList'
import Lock from './containers/Lock'
import VisibleChallengeList from './containers/VisibleChallengeList'
import points from '../data/points.json'
import initialChallenges from '../data/challenges.json'
import config from '../config.json'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AuthService from './util/AuthService'
import {persistStore, autoRehydrate} from 'redux-persist'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = createHistory()

const store = createStore(
  vrsvsApp, 
  { "users": [], "challenges": initialChallenges }, 
  compose(
    applyMiddleware(routerMiddleware(history)), 
    applyMiddleware(thunk),
    autoRehydrate()))

persistStore(store, {}, () => {
  console.log('rehydration complete')
})

const auth = new AuthService(config.auth0clientid, config.auth0apikey, config.auth0uri)

// onEnter callback to validate authentication in private routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={() => <App auth={auth}/>}/>
          <Route path="/login" component={Login}/>  
          <PrivateRoute path="/users" component={() => <VisibleUserList auth={auth}/>}/>
          <PrivateRoute path="/challenges" component={() => <VisibleChallengeList auth={auth}/>}/>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('root')
)