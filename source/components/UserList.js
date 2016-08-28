import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import User from './User'
import AddUser from '../containers/AddUser'

const UserList = ({ users, profileId }) => (
  <div>
    <List>
      <Subheader>Users</Subheader>
        {users.map(user =>
          <User
            key={user.id}
            meid={profileId}
            {...user}
          />
        )}
      <Divider inset={true} />
    </List>
  </div>
)

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default UserList