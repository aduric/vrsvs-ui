import { connect } from 'react-redux'
import { addUserFromFBProfile, removeUser } from '../actions'
import React, { PropTypes as T } from 'react'
import AuthService from '../util/AuthService'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile(),
      isLoggedIn: props.auth.loggedIn()
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      console.log('profile_updated')
      console.log(this.props);
      this.setState({profile: newProfile})
      this.props.dispatch(addUserFromFBProfile(newProfile));
    })
  }

  login() {
    this.props.auth.login(this.setState)
    this.props.appLogin()
  }

  logout() {
    //this.setState({isLoggedIn: false})
    this.props.auth.logout(this.setState)
  }

  delete() {
    this.props.auth.logout();
    this.props.dispatch(removeUser(this.state.profile.user_id));
  }

  render() {
    if(this.props.auth.loggedIn()) {
      return (
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
      )
    }
    else {
      return (
        <RaisedButton label="Login" onTouchTap={() => this.login()} />
      )
    }
  }
}

export default connect()(Login);