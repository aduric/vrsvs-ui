import React from 'react'
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


const App = (props) => ({
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  },
  render() {
    console.log('rendering app')
    console.log(this)
    console.log(props)
    if(props.auth.loggedIn()) {
      return(
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="vrsvs"/>
          </ToolbarGroup>
          <ToolbarSeparator/>
          <ToolbarGroup> 
            <Login {...props}/>
          </ToolbarGroup>
          <ToolbarSeparator/>
          <ToolbarGroup>
            <VisibleNotificationList {...props}/>
          </ToolbarGroup>
          <ToolbarSeparator/>
          <ToolbarGroup>
            <PointsBadge userId={props.auth.getProfile().user_id} fbase={props.fbase}/>
          </ToolbarGroup>
          <ToolbarSeparator/>
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
        </Toolbar>
      );      
    } else {
      return(
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="vrsvs"/>
          </ToolbarGroup>
          <ToolbarSeparator/>
          <ToolbarGroup> 
            <Login auth={props.auth}/>
          </ToolbarGroup>
        </Toolbar>
      );
    }
  }
})

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App