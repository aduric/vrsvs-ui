import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
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


const App = (props) => ({
  render() {
    if(props.auth.loggedIn()) {
      return(
        <AppBar 
          title={'vrsvs'}
          iconElementLeft={
              <Link to='/'>
                <svg style={{width: "48px", height: "48px"}}>
                  <use xlinkHref='svg/vrsvs_icon.svg#Bear_logo'/>
                </svg>
            </Link>}>
          <ToolbarGroup> 
            <Login {...props}/>
          </ToolbarGroup>
          <ToolbarGroup>
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
        </AppBar>
      );      
    } else {
      return(
        <AppBar title="vrsvs">
          <ToolbarGroup> 
            <Login auth={props.auth}/>
          </ToolbarGroup>
        </AppBar>
      );
    }
  }
})

export default App