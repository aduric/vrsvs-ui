import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { addUserFromFBProfile, removeUser } from '../actions'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import VisibleUserList from '../containers/VisibleUserList';
import VisibleChallengeList from '../containers/VisibleChallengeList';
import Login from './Login';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import VisibleNotificationList from '../containers/VisibleNotificationList';
import PointsBadge from './PointsBadge';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile(),
      isLoggedIn: props.auth.loggedIn()
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      console.log('profile_updated')
      this.setState({profile: newProfile, isLoggedIn: true})
      this.props.dispatch(addUserFromFBProfile(newProfile));
    })
    props.auth.on('logged_out', () => {
      this.setState({isLoggedIn: false})
      props.dispatch(push('/'))
    })
  }
  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout()
  }
  delete() {
    this.props.auth.logout();
    this.props.dispatch(removeUser(this.state.profile.user_id));
  }
  render() {
    console.log('app state')
    console.log(this.state)
      return(
        <AppBar 
          title={'vrsvs'}
          iconElementLeft={
              <Link to='/'>
                <svg style={{width: "48px", height: "48px"}}>
                  <use xlinkHref='svg/vrsvs_icon.svg#Bear_logo'/>
                </svg>
            </Link>}>
          {this.state.isLoggedIn ?
          <ToolbarGroup> 
            <IconMenu
              iconButtonElement={
                <IconButton
                  touch={true}
                  style={{padding: "0px"}}>
                  <Avatar src={this.props.auth.getProfile().picture} />
                </IconButton>
              }>        
              <MenuItem href="#" primaryText="Logout" onTouchTap={() => this.logout()} />
              <MenuItem href="#" primaryText="Delete Account" onTouchTap={() => this.delete()} style={{color: 'red'}}/>
            </IconMenu>
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >        
              <MenuItem href="users" primaryText="Users" />
              <MenuItem href="challenges" primaryText="Challenges" />
            </IconMenu>
          </ToolbarGroup>
          : 
          <ToolbarGroup>
            <RaisedButton label="Login" onTouchTap={() => this.login()} />
          </ToolbarGroup>
          }
        </AppBar>
      );      
  }
}

export default connect()(App)