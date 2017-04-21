import React, { PropTypes } from 'react'
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import AddUser from '../containers/AddUser'
import FacebookUserList from './FacebookUserList'


class UserList extends React.Component {
  constructor(props) {
    super(props);
    console.log('in userlist')
    console.log(props)
  }
  render() {
    console.log('redering userlist')
    console.log(this.props)
      return(
        <div>
          <Subheader>Active friends</Subheader>
          <FacebookUserList {...this.props}/>
          <Subheader>Invite friends</Subheader>
        </div>
      )
  }
}

export default UserList