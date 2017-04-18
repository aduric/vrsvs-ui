'use strict';

import autobind from 'autobind-decorator'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import uuid from 'node-uuid';
import UserChallenge from './UserChallenge'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen() {
    this.setState(
      {
        open: true,
      });
  }
  handleClose() {  
    this.setState({open: false});  
  }
  render() {
    return(
      <div>
        <UserChallenge 
          open={this.state.open}
          handleOpen={() => this.handleOpen()}
          handleClose={() => this.handleClose()}
          participantId={this.props.id}
          participantName={this.props.name}
          issuerId={this.props.meid}/>
        <ListItem
          leftAvatar={<Avatar src="images/ok-128.jpg" />}
          primaryText={this.props.name}
          onTouchTap={() => this.handleOpen()}
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>{this.props.points} points</span> --
              {this.props.text}
            </p>
          }
          secondaryTextLines={2}
        />
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  meid: PropTypes.string.isRequired,
}

export default User