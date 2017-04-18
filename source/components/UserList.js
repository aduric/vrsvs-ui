import React, { PropTypes } from 'react'
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import User from './User'
import AddUser from '../containers/AddUser'


class UserList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <List>
          {this.props.users.map(user =>
            <User 
              meid={this.props.profileId}
              {...user}
            />
          )}
          <Divider inset={true} />
        </List>
      </div>
    )
  }
}

export default UserList