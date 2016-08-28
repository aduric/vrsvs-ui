import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import VisibleUserList from '../containers/VisibleUserList';
import VisibleChallengeList from '../containers/VisibleChallengeList';
import Login from './Login';
import { Router, Route, } from 'react-router';

const App = (props) => ({
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  },

  render() {
    return(
      <div>
      <AppBar
        title="vrsvs"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={
          <div>
            <Login auth={this.props.route.auth}/>
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem href="users" primaryText="Users" />
              <MenuItem href="challenges" primaryText="Challenges" />
            </IconMenu>
          </div>
        }
      /> 
      {React.cloneElement(props.children, { auth: this.props.route.auth })}
      </div>
    );
  }
})

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App