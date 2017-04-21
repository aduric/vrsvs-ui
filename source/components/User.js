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
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: 5};

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
          leftAvatar={<Avatar src={this.props.avatar} />}
          rightAvatar={
            <Avatar
              color={deepOrange300}
              backgroundColor={purple500}
              size={30}
              style={style}
            >
              {this.props.points}
            </Avatar>
          }
          primaryText={this.props.name}
          onTouchTap={() => this.handleOpen()}
        />
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  meid: PropTypes.string.isRequired,
}

export default User