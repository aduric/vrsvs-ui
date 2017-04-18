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

class UserChallenge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      participantId: props.participantId,
      participantName: props.participantName,
      issuerId: props.issuerId,
      description: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        label="Challenge!"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          title={'Challenge '.concat(this.state.participantName)}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
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

UserChallenge.PropTypes = {
  participantId: PropTypes.string.isRequired,
  participantName: PropTypes.string.isRequired,
  issuerId: PropTypes.string.isRequired,
}

export default connect()(UserChallenge);