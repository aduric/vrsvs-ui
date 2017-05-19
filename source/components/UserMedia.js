'use strict';

import autobind from 'autobind-decorator'
import React, { PropTypes } from 'react'
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
import UserChallenge from './UserChallenge'
import { fetchPoints } from '../actions'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  cyan500
} from 'material-ui/styles/colors';

const style = {
  "min-width": "0px",
  "margin": "0px"
};

class UserMedia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localMediaStream: null,
            videoObj: {
                video: true,
                audio: true
            },
            navigator: navigator
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    componentWillMount() {
        this.state.navigator.getUserMedia = this.state.navigator.getUserMedia || this.state.navigator.webkitGetUserMedia
    }
    handleStart() {
        if (this.state.navigator.getUserMedia) {
            this.state.navigator.getUserMedia(this.state.videoObj, function(stream) {              
                this.video.src = (this.state.navigator.webkitGetUserMedia) ? window.webkitURL.createObjectURL(stream) : stream;
                this.state.localMediaStream = stream;
                
            }.bind(this), function(error) {
                console.error("Video capture error: ", error.code);
            });
        }
    }
    handleStop() {
        this.state.localMediaStream.getAudioTracks()[0].stop();
        this.state.localMediaStream.getVideoTracks()[0].stop();
    }
    handlePhoto() {
        this.canvas.context.drawImage(this.video, 0, 0, 320, 240);
    }
  render() {
    return(        
        <div>
            <video ref={(e) => { this.video = e; }} width="320" height="200" autoPlay></video>
            <div>
                <FloatingActionButton
                    style={style}
                    onTouchTap={() => this.handleStart()}>
                    <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton
                    secondary={true}
                    style={style}
                    onTouchTap={() => this.handleStop()}>
                    <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton
                    secondary={true}
                    style={style}
                    onTouchTap={() => this.handlePhoto()}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            <canvas ref={(e) => { this.canvas = e; }} width="320" height="240"></canvas>
        </div>
    );
  }
}

export default UserMedia