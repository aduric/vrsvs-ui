import React, { PropTypes } from 'react'
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import AddUser from '../containers/AddUser'
import User from './User'
import FacebookUserList from './FacebookUserList'
import { connect } from 'react-redux'
import Sharing from './Sharing';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  populatedDataToJS
} from 'react-redux-firebase'
import _ from 'underscore'

const populates = [
  { child: 'friends', root: 'users' }
]

@firebaseConnect(() => {
  const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {}
  return [
  { path: '/users/' + profile.user_id, populates }]
})
@connect(
  ({ firebase }) => ({
    users: dataToJS(firebase, '/users')
  })
)
class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, users } = this.props;
    const userList = !isLoaded(users)
      ? 'Loading'
      : isEmpty(users)
        ? <div>
            <p style={{"padding-left": "16px"}}>There are no active friends. Invite some!</p>
            <Sharing/>
          </div>
        : _.map(users, (v, k) =>
          <div>
            <User
              key={k}
              id={k}
              {...v}
            />
            <Divider inset={true} />
          </div>
        )
      return(
        <div>
          <List>
            {userList}
          </List>
        </div>
      )
  }
}

export default UserList