import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addUpdateChallengeResponse } from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import uuid from 'node-uuid';
import Recorder from './Recorder'

class ChallengeResponseForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      challengeid: props.id,
      responder: localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {},
      response_msg: '',
      response_vid: 'sentinel'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      response_msg: e.target.value,
    });
  }

  handleVideoChange(path) {
    this.setState({
      response_vid: path
    });
  }

  handleSubmit() {
    if (this.state.response_msg.trim() == "") {
      return
    }
    this.props.dispatch(addUpdateChallengeResponse(this.state.challengeid, uuid.v4(), this.state.responder.user_id, this.state.response_msg, this.state.response_vid));
  }

  render() {
    return (
      <div>
        <Recorder changeVideoPath={path => this.handleVideoChange(path)}/>
        <TextField
          hintText="Respond Here..."
          multiLine={true}
          rows={2}
          onChange={this.handleTextChange}
          />
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleSubmit}
        />
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.props.handleClose}
        />
      </div>
    )
  }
};

export default connect()(ChallengeResponseForm);