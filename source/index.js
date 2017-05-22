import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
import App from './components/App'
import NotFound from './components/NotFound'
import Login from './components/Login'
import UserList from './components/UserList'
import Lock from './containers/Lock'
import VisibleChallengeList from './containers/VisibleChallengeList'
import points from '../data/points.json'
import initialChallenges from '../data/challenges.json'
import config from '../config.json'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AuthService from './util/AuthService'
import {persistStore, autoRehydrate} from 'redux-persist'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as firebase from "firebase";
import BottomNav from './components/BottomNav';
import NotificationList from './components/NotificationList';
import VerticalNonLinear from './components/VerticalNonLinear';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import ChallengeList from './components/ChallengeList'
import SubscribedChallengeList from './components/SubscribedChallengeList'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = createHistory()

// Create store with reducers and initial state
const store = createStore(
  rootReducer,
  { "users": [], "challenges": [] },
  compose(
    applyMiddleware(routerMiddleware(history)), 
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(config.firebase, {})
  )
);

// add auth0
const auth = new AuthService(config.auth0clientid, config.auth0apikey, config.auth0uri)

// add firebase
const fbase = firebase.initializeApp(config.firebase);

// onEnter callback to validate authentication in private routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={() => <App auth={auth}/>}/>
          <Route exact path="/" component={() => auth.loggedIn() ? <NotificationList/> : <VerticalNonLinear/>}/>
          <Route path="/login" component={() => <div></div>}/>  
          <PrivateRoute path="/users" component={() => <UserList auth={auth}/>}/>
          <PrivateRoute path="/challenges" component={() => <ChallengeList auth={auth}/>}/>
          <PrivateRoute path="/subscribed" component={() => <SubscribedChallengeList auth={auth}/>}/>
          <Route path="/" component={() => <BottomNav/>}/>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('root')
)