import { connect } from 'react-redux'
import { addUser } from '../actions'
import React, { PropTypes as T } from 'react'
import AuthService from '../util/AuthService'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

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
      console.log(this.props);
      this.setState({profile: newProfile})
      this.props.dispatch(addUser(newProfile.user_id, newProfile.name));
    })
  }

  render() {
    const { auth } = this.props;
    const { profile } = this.state.profile;
    console.log(this.state.profile);
    if(this.state.isLoggedIn) {
      return (
        <p>
          <Avatar src={this.state.profile.picture} />
          <RaisedButton label="Logout" onClick={auth.logout.bind(this)} />
        </p>
      )
    }
    else{
      return (
        <RaisedButton label="Login" onClick={auth.login.bind(this)} />
      )
    }
  }
}

export default connect()(Login);