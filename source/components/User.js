'use strict';

import autobind from 'autobind-decorator'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addChallenge } from '../actions'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import uuid from 'node-uuid';

export class ChallengeDialog extends React.Component {

  constructor(props, context) {
    super(props, context)
    console.log(props)
    console.log(context)
    this.state = {
      open: false,
      participantId: props.participantId,
      participantName: props.participantName,
      issuerId: props.issuerId,
      description: ""
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleTextChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleSubmit() {
    console.log(this.state.description.trim());
    console.log(this.state.participantId);
    console.log(this.state.issuerId);
    if (this.state.description.trim() == "" || !this.state.participantId || !this.state.issuerId) {
      return
    }
    this.props.dispatch(addChallenge(uuid.v4(), this.state.issuerId, this.state.participantId, this.state.description.trim()));
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Challenge!"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Challenge" onTouchTap={this.handleOpen} />
        <Dialog
          title="Challenge ${this.state.participantName}?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField
          hintText="Challenge Description"
          multiLine={true}
          rows={2}
          value={this.state.description}
          onChange={this.handleTextChange}
          />          
        </Dialog>
      </div>
    )
  }
};

ChallengeDialog.PropTypes = {
  participantId: PropTypes.string.isRequired,
  participantName: PropTypes.string.isRequired,
  issuerId: PropTypes.string.isRequired,
}

const ChallengeButton = connect()(ChallengeDialog);

const User = ({ id, name, text, points, meid }) => (
  <ListItem
    leftAvatar={<Avatar src="images/ok-128.jpg" />}
    primaryText={name}
    rightIconButton={<ChallengeButton participantId={id} participantName={name} issuerId={meid} />}
    secondaryText={
      <p>
        <span style={{color: darkBlack}}>{points} points</span> --
        {text}
      </p>
    }
    secondaryTextLines={2}
  />
)

User.propTypes = {
  id: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  meid: PropTypes.string.isRequired,
}

export default User