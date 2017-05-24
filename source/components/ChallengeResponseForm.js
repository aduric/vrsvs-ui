import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addUpdateChallengeResponse } from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import uuid from 'node-uuid';
import Recorder from './Recorder'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import VideoAdd from 'material-ui/svg-icons/av/videocam';
import ReactPlayer from 'react-player'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const style = {
  margin: 18,
};

class ChallengeResponseForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      challengeid: props.id,
      responder: localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {},
      response_msg: '',
      response_vid: 'sentinel',
      response_vid_preview: null,
      video_open: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVidOpen = this.handleVidOpen.bind(this);
    this.handleVidClose = this.handleVidClose.bind(this);
    this.handleVidCloseOnCancel = this.handleVidCloseOnCancel.bind(this);
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

  handleVideoPreview(path) {
    this.setState({
      response_vid_preview: path
    });
  }

  handleVidOpen() {
    this.setState({
      video_open: true
    });
  }

  handleVidClose() {
    this.setState({
      video_open: false
    });
  }

  handleVidCloseOnCancel() {
    this.setState({
      video_open: false,
      response_vid: 'sentinel'
    });
  }

  handleSubmit() {
    if (this.state.response_msg.trim() == "") {
      return
    }
    this.setState({
      video_open: false,
      response_vid: 'sentinel',
      response_msg: '',
      response_vid_preview: null
    });   
    this.props.dispatch(addUpdateChallengeResponse(this.state.challengeid, uuid.v4(), this.state.responder.user_id, this.state.response_msg, this.state.response_vid));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleVidCloseOnCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleVidClose}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Add video to response"
          actions={actions}
          modal={false}
          open={this.state.video_open}
          onRequestClose={this.handleVidClose}
        >       
          <Recorder changePreviewPath={path => this.handleVideoPreview(path)} changeVideoPath={path => this.handleVideoChange(path)}/>
        </Dialog>
        {this.state.response_vid !== 'sentinel' && !this.state.video_open ? 
          <ReactPlayer url={this.state.response_vid_preview} controls playing loop mute playsinline width={320} height={200}/>: null}
            <TextField
              defaultValue={this.state.response_msg}
              hintText="Respond Here..."
              onChange={this.handleTextChange}
              />
            <FloatingActionButton 
              mini={true}
              onTouchTap={this.handleVidOpen}>
              <VideoAdd />
            </FloatingActionButton>
            <FloatingActionButton 
              mini={true}
              onTouchTap={this.handleSubmit}>
              <ContentAdd />
            </FloatingActionButton>
      </div>
    )
  }
};

export default connect()(ChallengeResponseForm);