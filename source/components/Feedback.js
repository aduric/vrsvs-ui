import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addFeedback } from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import uuid from 'node-uuid';

class Feedback extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      snack_open: false,
      response: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      response: e.target.value,
    });
  }

  handleSubmit() {

    if (this.state.response.trim() == "") {
      return
    }
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {}    
    this.props.dispatch(addFeedback(uuid.v4(), profile.user_id, this.state.response.trim()));
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
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          title={'Leave Feedback'}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
        <TextField
          hintText="Comments"
          value={this.state.response}
          onChange={this.handleTextChange}
          />          
        </Dialog>
        <Snackbar
          open={this.state.snack_open}
          message="Thank You!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
};


export default connect()(Feedback);