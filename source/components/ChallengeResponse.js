import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addChallenge } from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import uuid from 'node-uuid';

class ChallengeResponse extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      open: props.open,
      responder: props.responder,
      message: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleSubmit() {
    if (this.state.message.trim() == "") {
      return
    }
    this.props.dispatch(respondChallenge(this.state.id, this.state.responder, this.state.message));
    this.props.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          title={'Challenge Response'}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
        <TextField
          hintText="Respond Here..."
          multiLine={true}
          rows={2}
          onChange={this.handleTextChange}
          />          
        </Dialog>
      </div>
    )
  }
};

export default connect()(ChallengeResponse);