import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addChallenge } from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import uuid from 'node-uuid';

class UserChallenge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      snack_open: false,
      participantId: props.participantId,
      participantName: props.participantName,
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
    if (this.state.description.trim() == "" || !this.state.participantId) {
      return
    }
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {}    
    this.props.dispatch(addChallenge(uuid.v4(), profile.user_id, this.state.participantId, this.state.description.trim()));
    this.props.handleClose();
    this.setState({
      snack_open: true,
    });
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
          value={this.state.description}
          onChange={this.handleTextChange}
          />          
        </Dialog>
        <Snackbar
          open={this.state.snack_open}
          message="Challenge created!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
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