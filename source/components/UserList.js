import React, { PropTypes } from 'react'
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import AddUser from '../containers/AddUser'
import User from './User'
import FacebookUserList from './FacebookUserList'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import _ from 'underscore'

@firebaseConnect([
  '/users'
])
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    users: dataToJS(firebase, '/users'),
  })
)
class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, users } = this.props;
    console.log('redering userlist')
    console.log(this.props)
    const userList = !isLoaded(users)
      ? 'Loading'
      : isEmpty(users)
        ? <p style={{"padding-left": "16px"}}>There are no active friends. Invite some!</p>
        : _.map(users, user =>
          <div>
            <User
              key={user.id} 
              meid={this.props.profileId}
              {...user}
            />
            <Divider inset={true} />
          </div>
        )
      return(
        <div>
          <Subheader>Active friends</Subheader>
          <List>
            {userList}
          </List>
          <Subheader>Invite friends</Subheader>
        </div>
      )
  }
}

export default UserList